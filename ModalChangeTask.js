import {createInputGroup, isValidDate, isValidEnter, convertDate, convertDateReadable, markAsInvalid, convertForInputDate} from "./Functions.js";
import {Task} from "./Task.js";


export class ModalChangeTask {
    selfId
    hText
    targetObject

    constructor(modalChangeData) {
        Object.assign(this, { ...modalChangeData });

        this.selfInputTaskId = `selfInputTaskId${Task.getUniqueId()}`;
        this.selfInputCreationDateId = `selfInputCreationDateId${Task.getUniqueId()}`;
        this.selfInputExpirationDateId = `selfInputExpirationDateId${Task.getUniqueId()}`;
        this.buttonSAVEId = `buttonSAVEId${Task.getUniqueId()}`;
        this.buttonCANCELId = `buttonCANCELId${Task.getUniqueId()}`;

        this.initializeAssembleFull()
    }

    initializeChangeModal() {
        document.getElementById('forChangeModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modal_content">
                    <h2>${this.hText}</h2>
                   
                    ${createInputGroup({
                        inputId : this.selfInputTaskId, 
                        pText : `Task : `, 
                        inputType : 'text'
                    })}
                    ${createInputGroup({
                        inputId : this.selfInputCreationDateId, 
                        pText : `Creation Date :`, 
                        inputType : 'date'
                    })}
                    ${createInputGroup({
                        inputId : this.selfInputExpirationDateId, 
                        pText : 'Expiration Date :', 
                        inputType : 'date'
                    })}
                    
                    <a href="#" class="buttonModal" id="${this.buttonSAVEId}">SAVE</a>
                    <a href="#" class="buttonModal" id="${this.buttonCANCELId}">CANCEL</a>
                </div>
            </div>
        `
    }

    initializeInputDefaultValues() {
        document.getElementById(this.selfInputTaskId).value = this.targetObject.text;
        document.getElementById(this.selfInputCreationDateId).value = convertForInputDate(this.targetObject.creationDate);
        document.getElementById(this.selfInputExpirationDateId).value = convertForInputDate(this.targetObject.expirationDate);
    }

    static initializeChangeHandlers(modal) {
        document.getElementById(modal.buttonSAVEId).addEventListener('click', function OKClicked() {

            const selfInputTaskElem = document.getElementById(modal.selfInputTaskId);
            const selfInputCreationDateElem = document.getElementById(modal.selfInputCreationDateId);
            const selfInputExpirationDateElem = document.getElementById(modal.selfInputExpirationDateId);

            const changedTaskText = document.getElementById(modal.selfInputTaskId).value;
            const changedTaskCreationDate = document.getElementById(modal.selfInputCreationDateId).value;
            const changedTaskExpirationDate = document.getElementById(modal.selfInputExpirationDateId).value;

            const toChangeTaskElem = document.getElementById(modal.targetObject.taskTextId);
            const toChangeCreationDateElem = document.getElementById(modal.targetObject.creationDateId);
            const toChangeExpirationDateElem = document.getElementById(modal.targetObject.expirationDateId);

            let allChecked = (isValidEnter(changedTaskText) && isValidDate(convertDate(changedTaskCreationDate), convertDate(changedTaskExpirationDate)));

            if (allChecked) {
                toChangeTaskElem.innerText = `Task: ${changedTaskText}`;
                toChangeCreationDateElem.innerText = `Creation Date: ${convertDateReadable(changedTaskCreationDate)}`;
                toChangeExpirationDateElem.innerText = `Expiration Date: ${convertDateReadable(changedTaskExpirationDate)}`;

                const changedObject = new Task({
                    text : changedTaskText,
                    creationDate : convertDateReadable(changedTaskCreationDate),
                    expirationDate : convertDateReadable(changedTaskExpirationDate),
                    isCompleted : modal.targetObject.isCompleted,
                    taskTextId : modal.targetObject.taskTextId,
                    creationDateI : modal.targetObject.creationDateI,
                    expirationDateId : modal.targetObject.expirationDateId,
                    pencilId : modal.targetObject.pencilId,
                    checkBoxId : modal.targetObject.checkBoxId,
                    divId : modal.targetObject.divId,
                    paragraphId : modal.targetObject.paragraphId,
                    mainId : modal.targetObject.mainId,
                });

                Task.replaceTaskWithChanged(changedObject);

                document.getElementById(modal.selfId).style.display = "none";
            } else {
                if (!isValidEnter(changedTaskText)){
                    markAsInvalid(selfInputTaskElem);
                }
                if (!isValidDate(convertDate(changedTaskCreationDate), convertDate(changedTaskExpirationDate))) {
                    markAsInvalid(selfInputCreationDateElem);
                    markAsInvalid(selfInputExpirationDateElem);
                }
            }
        });

        document.getElementById(modal.buttonCANCELId).addEventListener('click', function cancelClicked() {
            document.getElementById(modal.selfId).style.display = "none";
        });
    }

    initializeAssembleFull() {
        this.initializeChangeModal();
        ModalChangeTask.initializeChangeHandlers(this);
        this.initializeInputDefaultValues()
        this.visible();
    }

    visible() {
        document.getElementById(this.selfId).style.display = "block";
    }
}
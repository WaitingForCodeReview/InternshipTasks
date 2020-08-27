import {createInputGroup, createInputTask, isValidDate, isValidEnter, isValidTime, convertDate, convertDateReadable, markAsInvalid, sliceElementText} from "./Functions.js";
import {Task} from "./Task.js";
import {convertForInputDate} from "./Functions.js";


export class ModalChangeTask {
    selfId
    toChangeTaskId
    toChangeCreationDateId
    toChangeExpirationDateId
    toChangeCreationTimeId
    toChangeExpirationTimeId
    hText

    constructor(modalChangeData) {
        Object.assign(this, { ...modalChangeData });
        this.selfInputTaskId = `selfInputTaskId${Task.getUniqueId()}`;
        this.selfInputCreationDateId = `selfInputCreationDateId${Task.getUniqueId()}`;
        this.selfInputExpirationDateId = `selfInputExpirationDateId${Task.getUniqueId()}`;
        this.selfInputTimeCreationId = `selfInputTimeCreationId${Task.getUniqueId()}`;
        this.selfInputTimeExpirationId = `selfInputTimeExpirationId${Task.getUniqueId()}`;
        this.buttonSAVEId = `buttonSAVEId${Task.getUniqueId()}`;
        this.buttonCANCELId = `buttonCANCELId${Task.getUniqueId()}`;

        // choose which modal to create : with time edit or not (depends on task)
        if(document.getElementById(this.toChangeCreationTimeId) !== null) {
            this.initializeAssembleFull()
        } else {
            this.initializeAssembleSimplified();
        }
    }

    initializeChangeModal() {
        document.getElementById('forChangeModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modal_content">
                    <h2>${this.hText}</h2>
                   
                    ${createInputTask(this.selfInputTaskId, `Task : `)}
                    ${createInputGroup(this.selfInputCreationDateId, 'Creation Date :')}
                    ${createInputGroup(this.selfInputExpirationDateId, 'Expiration Date :')}
                    ${createInputTask(this.selfInputTimeCreationId, 'Creation Time :')}
                    ${createInputTask(this.selfInputTimeExpirationId, 'Expiration Time :')}
                    
                    <a href="#" class="buttonModal" id="${this.buttonSAVEId}">SAVE</a>
                    <a href="#" class="buttonModal" id="${this.buttonCANCELId}">CANCEL</a>
                </div>
            </div>
        `
    }
    initializeInputDefaultValues() {
        document.getElementById(this.selfInputTaskId).value = sliceElementText(document.getElementById(this.toChangeTaskId).innerText);
        document.getElementById(this.selfInputCreationDateId).value = convertForInputDate(sliceElementText(document.getElementById(this.toChangeCreationDateId).innerText));
        document.getElementById(this.selfInputExpirationDateId).value = convertForInputDate(sliceElementText(document.getElementById(this.toChangeExpirationDateId).innerText));
        document.getElementById(this.selfInputTimeCreationId).value = sliceElementText(document.getElementById(this.toChangeCreationTimeId).innerText);
        document.getElementById(this.selfInputTimeExpirationId).value = sliceElementText(document.getElementById(this.toChangeExpirationTimeId).innerText);
    }
    static initializeChangeHandlers(modal) {
        document.getElementById(modal.buttonSAVEId).addEventListener('click', function OKClicked() {

            const selfInputTaskElem = document.getElementById(modal.selfInputTaskId);
            const selfInputCreationDateElem = document.getElementById(modal.selfInputCreationDateId);
            const selfInputExpirationDateElem = document.getElementById(modal.selfInputExpirationDateId);
            const selfInputTimeCreationElem = document.getElementById(modal.selfInputTimeCreationId);
            const selfInputTimeExpirationElem = document.getElementById(modal.selfInputTimeExpirationId);

            const changedTaskText = document.getElementById(modal.selfInputTaskId).value;
            const changedTaskCreationDate = document.getElementById(modal.selfInputCreationDateId).value;
            const changedTaskExpirationDate = document.getElementById(modal.selfInputExpirationDateId).value;
            const changedTaskCreationTime = document.getElementById(modal.selfInputTimeCreationId).value;
            const changedTaskExpirationTime = document.getElementById(modal.selfInputTimeExpirationId).value;

            const toChangeTaskElem = document.getElementById(modal.toChangeTaskId);
            const toChangeCreationDateElem = document.getElementById(modal.toChangeCreationDateId);
            const toChangeExpirationDateElem = document.getElementById(modal.toChangeExpirationDateId);
            const toChangeCreationTimeElem = document.getElementById(modal.toChangeCreationTimeId);
            const toChangeExpirationTimeElem = document.getElementById(modal.toChangeExpirationTimeId);

            let allChecked = (isValidEnter(changedTaskText) && isValidDate(convertDate(changedTaskCreationDate), convertDate(changedTaskExpirationDate)) &&
                              isValidTime(changedTaskCreationTime) && isValidTime(changedTaskExpirationTime));

            if(allChecked) {
                toChangeTaskElem.innerText = `Task : ${changedTaskText}`;
                toChangeCreationDateElem.innerText = `Creation Date : ${convertDateReadable(changedTaskCreationDate)}`;
                toChangeExpirationDateElem.innerText = `Expiration Date : ${convertDateReadable(changedTaskExpirationDate)}`;
                toChangeCreationTimeElem.innerText = `Creation Time : ${changedTaskCreationTime}`;
                toChangeExpirationTimeElem.innerText = `Expiration Time : ${changedTaskExpirationTime}`;

                document.getElementById(modal.selfId).style.display = "none";
            } else {
                if(!isValidEnter(changedTaskText)){
                    markAsInvalid(selfInputTaskElem);
                }
                if(!isValidDate(convertDate(changedTaskCreationDate), convertDate(changedTaskExpirationDate))) {
                    markAsInvalid(selfInputCreationDateElem);
                    markAsInvalid(selfInputExpirationDateElem);
                }
                if(!isValidTime(changedTaskCreationTime)){
                    markAsInvalid(selfInputTimeCreationElem);
                }
                if(!isValidTime(changedTaskExpirationTime)){
                    markAsInvalid(selfInputTimeExpirationElem);
                }
            }
        });

        document.getElementById(modal.buttonCANCELId).addEventListener('click', function cancelClicked() {
            document.getElementById(modal.selfId).style.display = "none";
        });
    }

    initializeChangeModalSimplified() {
        document.getElementById('forChangeModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modal_content">
                    <h2>${this.hText}</h2>
                   
                    ${createInputTask(this.selfInputTaskId, `Task : `)}
                    ${createInputGroup(this.selfInputCreationDateId, 'Creation Date :')}
                    ${createInputGroup(this.selfInputExpirationDateId, 'Expiration Date :')}
                    
                    <a href="#" class="buttonModal" id="${this.buttonSAVEId}">SAVE</a>
                    <a href="#" class="buttonModal" id="${this.buttonCANCELId}">CANCEL</a>
                </div>
            </div>
        `
    }
    initializeInputDefaultValuesSimplified() {
        document.getElementById(this.selfInputTaskId).value = sliceElementText(document.getElementById(this.toChangeTaskId).innerText);
        document.getElementById(this.selfInputCreationDateId).value = convertForInputDate(sliceElementText(document.getElementById(this.toChangeCreationDateId).innerText));
        document.getElementById(this.selfInputExpirationDateId).value = convertForInputDate(sliceElementText(document.getElementById(this.toChangeExpirationDateId).innerText));
    }
    static initializeChangeHandlersSimplified(modal) {
        document.getElementById(modal.buttonSAVEId).addEventListener('click', function OKClicked() {

            const selfInputTaskElem = document.getElementById(modal.selfInputTaskId);
            const selfInputCreationDateElem = document.getElementById(modal.selfInputCreationDateId);
            const selfInputExpirationDateElem = document.getElementById(modal.selfInputExpirationDateId);

            const changedTaskText = document.getElementById(modal.selfInputTaskId).value;
            const changedTaskCreationDate = document.getElementById(modal.selfInputCreationDateId).value;
            const changedTaskExpirationDate = document.getElementById(modal.selfInputExpirationDateId).value;

            const toChangeTaskElem = document.getElementById(modal.toChangeTaskId);
            const toChangeCreationDateElem = document.getElementById(modal.toChangeCreationDateId);
            const toChangeExpirationDateElem = document.getElementById(modal.toChangeExpirationDateId);


            if(isValidEnter(changedTaskText) && isValidDate(convertDate(changedTaskCreationDate), convertDate(changedTaskExpirationDate))) {
                toChangeTaskElem.innerText = `Task : ${changedTaskText}`;
                toChangeCreationDateElem.innerText = `Creation Date : ${convertDateReadable(changedTaskCreationDate)}`;
                toChangeExpirationDateElem.innerText = `Expiration Date : ${convertDateReadable(changedTaskExpirationDate)}`;

                document.getElementById(modal.selfId).style.display = "none";
            } else {
                if(!isValidEnter(changedTaskText)){
                    markAsInvalid(selfInputTaskElem);
                }
                if(!isValidDate(convertDate(changedTaskCreationDate), convertDate(changedTaskExpirationDate))) {
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
    initializeAssembleSimplified() {
        this.initializeChangeModalSimplified();
        ModalChangeTask.initializeChangeHandlersSimplified(this);
        this.initializeInputDefaultValuesSimplified()
        this.visible();
    }

    visible() {
        document.getElementById(this.selfId).style.display = "block";
    }
}
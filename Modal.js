import {Task} from "./Task.js";
import {createInputGroup, isValidEnter, rejectTask, convertDateReadable, markAsInvalid} from "./Functions.js";
import {taskInput, tasksObj} from "./Variables.js";
import {createInputTask} from "./Functions.js";
import {convertDate, isValidDate} from "./Functions.js";

export class Modal {
    selfId
    inputTaskId
    inputCreationId
    inputExpirationId
    buttonOKId
    buttonCANCELId
    hText

    constructor(modalData) {
        Object.assign(this, { ...modalData });
    }

    initializeModal() {
        document.getElementById('forModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modal_content">
                    <h2>${this.hText}</h2>
                    
                    ${createInputTask(this.inputTaskId, 'Task :')}
                    ${createInputGroup(this.inputCreationId, 'Creation Date :')}
                    ${createInputGroup(this.inputExpirationId, 'Expiration Date :')}
                    
                    <a href="#" class="buttonModal" id="${this.buttonOKId}">OK</a>
                    <a href="#" class="buttonModal" id="${this.buttonCANCELId}">CANCEL</a>
                </div>
            </div>
        `
    }

    static clearInputs(modal) {
        document.getElementById(modal.inputCreationId).value = "";
        document.getElementById(modal.inputExpirationId).value = "";
        document.getElementById(modal.inputTaskId).value = "";
    }

    static initializeHandlers(modal) {
        document.getElementById(modal.buttonOKId).addEventListener('click', function okClicked() {
            const inputTask = document.getElementById(modal.inputTaskId);
            const dateCreation = convertDate(document.getElementById(modal.inputCreationId).value);
            const dateExpiration = convertDate(document.getElementById(modal.inputExpirationId).value);

            if(isValidEnter(inputTask.value) && isValidDate(dateCreation,dateExpiration)) {
                const now = new Date();

                const task = new Task({
                    text : inputTask.value,
                    creationDate : convertDateReadable(document.getElementById(modal.inputCreationId).value),
                    creationTime : 'modalEnter',
                    expirationDate : convertDateReadable(document.getElementById(modal.inputExpirationId).value),
                    expirationTime : 'modalEnter',
                });

                tasksObj.push(task);
                document.getElementById('tasks').innerHTML += task.getInnerHtmlModal();
                taskInput.value = "";
                Modal.clearInputs(modal);
                document.getElementById(modal.selfId).style.display = "none";
            } else {
                if(!isValidEnter(inputTask.value)){
                    markAsInvalid(inputTask);
                }
                if(!isValidDate(dateCreation,dateExpiration)) {
                    const creationElem = document.getElementById(modal.inputCreationId);
                    const expirationElem = document.getElementById(modal.inputExpirationId);
                    markAsInvalid(creationElem);
                    markAsInvalid(expirationElem);
                }
            }
        });

        document.getElementById(modal.buttonCANCELId).addEventListener('click', function cancelClicked() {
            document.getElementById(modal.selfId).style.display = "none";
            Modal.clearInputs(modal);
        });
    }

    visible() {
        document.getElementById(this.selfId).style.display = "block";
    }
}
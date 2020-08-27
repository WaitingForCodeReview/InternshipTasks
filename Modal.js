import {Task} from "./Task.js";
import {createInputGroup, isValidEnter, rejectTask} from "./Functions.js";
import {taskInput, tasksObj} from "./Variables.js";

export class Modal {
    constructor(selfId, inputCreationId, inputExpirationId, inputCreationTimeId,
                inputExpirationTimeId, buttonOKId, buttonCANCELId, hText) {
        this.selfId = selfId;
        this.inputCreationId = inputCreationId;
        this.inputExpirationId = inputExpirationId;
        this.inputCreationTimeId = inputCreationTimeId;
        this.inputExpirationTimeId = inputExpirationTimeId;
        this.buttonOKId = buttonOKId;
        this.buttonCANCELId = buttonCANCELId;
        this.hText = hText;
    }
    initializeModal() {
        document.getElementById('forModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modal_content">
                    <h2>${this.hText}</h2>
                    
                    ${createInputGroup(this.inputCreationId, 'Creation Date')}
                    ${createInputGroup(this.inputExpirationId, 'Expiration Date')}
                    ${createInputGroup(this.inputCreationTimeId, 'Creation Time')}
                    ${createInputGroup(this.inputExpirationTimeId, 'Expiration Time')}
                    
                    <a href="#" class="buttonModal" id="${this.buttonOKId}">OK</a>
                    <a href="#" class="buttonModal" id="${this.buttonCANCELId}">CANCEL</a>
                </div>
            </div>
        `
    }

    static clearInputs(modal) {
        document.getElementById(modal.inputCreationId).value = "";
        document.getElementById(modal.inputExpirationId).value = "";
        document.getElementById(modal.inputCreationTimeId).value = "";
        document.getElementById(modal.inputExpirationTimeId).value = "";
    }

    static initializeHandlers(modal) {
        document.getElementById(modal.buttonOKId).addEventListener('click', function okClicked() {
            document.getElementById(modal.selfId).style.display = "none";

            if(isValidEnter(taskInput.value)) {
                const now = new Date();

                const task = new Task({
                    text : taskInput.value,
                    creationDate : document.getElementById(modal.inputCreationId).value,
                    creationTime : document.getElementById(modal.inputCreationTimeId).value,
                    expirationDate : document.getElementById(modal.inputExpirationId).value,
                    expirationTime : document.getElementById(modal.inputExpirationTimeId).value,
                });

                tasksObj.push(task);
                document.getElementById('tasks').innerHTML += task.getInnerHtml();
                taskInput.value = "";
            } else {
                rejectTask();
            }

            Modal.clearInputs(modal);
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
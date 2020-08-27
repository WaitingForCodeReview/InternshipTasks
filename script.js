import {Modal} from './Modal.js';
import {createTask, isValidEnter, rejectTask, markTaskAsDone, markTaskAsUnDone} from "./Functions.js";
import {taskInput, tasksObj} from "./Variables.js";
import {Task} from "./Task.js";



taskInput.addEventListener('keydown', function inputEnterPressed(event) {
    if(event.code == 'Enter') {
        if(isValidEnter(taskInput.value)) {
            createTask();
        } else {
            rejectTask();
        }
    }
})


export let modal = new Modal({
    selfId : 'modal',
    inputCreationId : 'inputCreation',
    inputExpirationId : 'inputExpiration',
    inputCreationTimeId : 'inputCreationTime',
    inputExpirationTimeId: 'inputExpirationTime',
    buttonOKId : 'buttonOK',
    buttonCANCELId : 'buttonCANCEL',
    hText : 'User-date,time-set'
});

modal.initializeModal();
Modal.initializeHandlers(modal);


const plusIcon = document.getElementById('plusImage');
plusIcon.addEventListener('click', function plusIconClicked() {
    modal.visible();
});

document.getElementById('tasks').addEventListener('click', function targetCheckBox(event) {
    const target = event.target;
    if(target.type == 'checkbox') {
        const elementDivId = tasksObj.find(item => item.checkBoxId === target.id).divId;
        target.checked ? markTaskAsDone(elementDivId) : markTaskAsUnDone(elementDivId);
    }
});

document.getElementById('tasks').addEventListener('click', function targetCrossbow(event) {
    const target = event.target;
    if(target.classList.contains('crossbow')) {
        Task.removeTask(tasksObj.find( item => item.paragraphId === target.id).mainId);
    }
});
import {Modal} from './Modal.js';
import {createTask, isValidEnter, rejectTask, markTaskAsDone, markTaskAsUnDone} from "./Functions.js";
import {taskInput, tasksObj} from "./Variables.js";
import {Task} from "./Task.js";
import {ModalChangeTask} from "./ModalChangeTask.js";



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
    inputTaskId : 'inputTask',
    inputCreationId : 'inputCreation',
    inputExpirationId : 'inputExpiration',
    buttonOKId : 'buttonOK',
    buttonCANCELId : 'buttonCANCEL',
    hText : 'User-date-set'
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

document.getElementById('tasks').addEventListener('click', function targetEdit(event) {
    const target = event.target;
    if(target.classList.contains('fas')) {
        const element = tasksObj.find(item => item.pencilId === target.id);
        let modalChange = new ModalChangeTask({
            selfId : 'changeTask',
            toChangeTaskId : element.taskTextId,
            toChangeCreationDateId : element.creationDateId,
            toChangeExpirationDateId : element.expirationDateId,
            toChangeCreationTimeId : element.creationTimeId,
            toChangeExpirationTimeId : element.expirationTimeId,
            hText : 'User task-change',
        })
    }
});
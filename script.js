import {Modal} from './Modal.js';
import {createTask, isValidEnter, rejectTask, markTaskAsDone, markTaskAsUnDone} from "./Functions.js";
import {taskInput, tasksObj} from "./Variables.js";



taskInput.addEventListener('keydown', function inputEnterPressed(event) {
    if(event.code == 'Enter') {
        if(isValidEnter(taskInput.value)) {
            createTask();
        } else {
            rejectTask();
        }
    }
})


export let modal = new Modal('modal', 'inputCreation', 'inputExpiration', 'inputCreationTime',
                       'inputExpirationTime', 'buttonOK', 'buttonCANCEL', 'User-date,time-set');
modal.initializeModal();
Modal.initializeHandlers(modal);


const plusIcon = document.getElementById('plusImage');
plusIcon.addEventListener('click', function plusIconClicked() {
    modal.visible();
});

document.getElementById('tasks').addEventListener('click', function targetCheckBox(event) {
    const target = event.target;
    tasksObj.forEach( item => {
        if(item.checkBoxId == target.id) {
            if(target.checked) {
                markTaskAsDone(item.divId);
            } else {
                markTaskAsUnDone(item.divId);
            }
        }
    })
});


document.getElementById('tasks').addEventListener('click', function targetCrossbow(event) {
    if(event.target.classList.contains('crossbow')) {
        const target = event.target;
        tasksObj.filter(item => item.paragraphId == target.id)
            .forEach( item => document.getElementById(item.mainId).parentNode.removeChild(document.getElementById(item.mainId)));
    }
});
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


let modal = new Modal('modal', 'inputCreation', 'inputExpiration', 'inputCreationTime',
                       'inputExpirationTime', 'buttonOK', 'buttonCANCEL', 'User-date,time-set');
modal.initializeModal();
Modal.initializeHandlers(modal);


const plusIcon = document.getElementById('plusImage');
plusIcon.addEventListener('click', function PlusIconClicked() {
    modal.visible();
});

document.getElementById('tasks').addEventListener('click', function targetCheckBox(event) {
    if(event.target.type == 'checkbox') {
        for(let i = 0; i < tasksObj.length; i++) {
            if(tasksObj[i].checkBoxId == event.target.id) {
                if(document.getElementById(tasksObj[i].checkBoxId).checked) {
                    markTaskAsDone(tasksObj[i].divId);
                } else {
                    markTaskAsUnDone(tasksObj[i].divId);
                }
            }
        }
    }
});

document.getElementById('tasks').addEventListener('click', function targetCrossbow(event) {
    if(event.target.classList.contains('crossbow')) {
        for(let i = 0; i < tasksObj.length; i++) {
            if(tasksObj[i].paragraphId == event.target.id) {
                document.getElementById(tasksObj[i].mainId).parentNode.removeChild(document.getElementById(tasksObj[i].mainId));
            }
        }
    }
});
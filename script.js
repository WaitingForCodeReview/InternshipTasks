import {Modal} from './Modal.js';
import {createTask, isValidEnter, rejectTask} from "./Functions.js";
import {taskInput} from "./Variables.js";
import {tasksObj} from "./Variables.js";



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
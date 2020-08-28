import {Modal} from './Modal.js';
import {createTask, isValidEnter, rejectTask, markTaskAsDone, markTaskAsUnDone} from "./Functions.js";
import {taskInput, tasksObj} from "./Variables.js";
import {Task} from "./Task.js";
import {ModalChangeTask} from "./ModalChangeTask.js";
import {convertForInputDate} from "./Functions.js";
import {refactorTaskMarkup} from "./Functions.js";

let pageState = 'All';

taskInput.addEventListener('keydown', function inputEnterPressed(event) {
    if (event.code == 'Enter') {
        if (isValidEnter(taskInput.value)) {
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
    if (target.type == 'checkbox') {
        const element = tasksObj.find(item => item.checkBoxId === target.id);
        target.checked ? markTaskAsDone(element) : markTaskAsUnDone(element);
            if (pageState === 'Completed' && !target.checked) {
                document.getElementById(element.mainId).style.display = 'none';
            }
            if (pageState === 'Active' && target.checked) {
                document.getElementById(element.mainId).style.display = 'none';
            }
        }
});

document.getElementById('tasks').addEventListener('click', function targetCrossbow(event) {
    const target = event.target;
    if (target.classList.contains('crossbow')) {
        Task.removeTask(tasksObj.find( item => item.paragraphId === target.id).mainId);
    }
});

document.getElementById('tasks').addEventListener('click', function targetEdit(event) {
    const target = event.target;
    if (target.classList.contains('fas')) {
        const element = tasksObj.find(item => item.pencilId === target.id);
        let modalChange = new ModalChangeTask({
            selfId : 'changeTask',
            hText : 'User task-change',
            targetObject : element,
        });
    }
});

document.getElementById('buttonAll').addEventListener('click', function allClicked() {
    pageState = 'All';
    tasksObj.forEach(item => {
        document.getElementById(item.mainId).style.display = 'flex';
    })
})
document.getElementById('buttonActive').addEventListener('click', function activeClicked() {
    pageState = 'Active';
    tasksObj.forEach(item => {
        if (item.isCompleted === false) {
            document.getElementById(item.mainId).style.display = 'flex';
        } else {
            document.getElementById(item.mainId).style.display = 'none';
        }
    })
})
document.getElementById('buttonCompleted').addEventListener('click', function completedClicked() {
    pageState = 'Completed';
    tasksObj.forEach(item => {
        if (item.isCompleted === true) {
            document.getElementById(item.mainId).style.display = 'flex';
        } else {
            document.getElementById(item.mainId).style.display = 'none';
        }
    })
})
document.getElementById('buttonClearCompleted').addEventListener('click', function clearCompletedClicked() {
    const completedObj = tasksObj.filter( item => item.isCompleted === true)

    completedObj.forEach( item => Task.removeTask(item.mainId));
})

document.getElementById('sort').addEventListener('click', function showUnshowSortBlock() {
    if (document.getElementById('sortBlock').style.display === 'block') {
        document.getElementById('sortBlock').style.display = 'none';
    } else {
        document.getElementById('sortBlock').style.display = 'block';
    }
})


document.getElementById('sortBlock').addEventListener('click', function sortChoose(event) {
    const target = event.target;

    if (target.id === 'buttonTextSort') {
        tasksObj.sort((a,b) => a.text.localeCompare(b.text));
        refactorTaskMarkup();
    }
    if (target.id === 'buttonDateSort') {
        tasksObj.sort((a,b) => new Date(convertForInputDate(a.creationDate)) - new Date(convertForInputDate(b.creationDate)));
        refactorTaskMarkup();
    }
})
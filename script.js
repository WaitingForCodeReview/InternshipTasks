import {Modal} from './Modal.js';
import {createTask, isValidEnter, rejectTask, markTaskAsDone, markTaskAsUnDone, convertForInputDate, refactorTaskMarkup, markAsInvalid, isValidDateEnter} from "./Functions.js";
import {taskInput, tasksObj} from "./Variables.js";
import {Task} from "./Task.js";
import {ModalChangeTask} from "./ModalChangeTask.js";
import {filterTask, filterDate} from "./Functions.js";

let pageState = 'All';

taskInput.addEventListener('keydown', function inputEnterPressed(event) {
    if (event.code == 'Enter' && isValidEnter(taskInput.value)) {
        createTask();
    } else if(event.code == 'Enter' && !isValidEnter(taskInput.value)){
            rejectTask();
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
        const elementHtml = document.getElementById(element.mainId);

        target.checked ? markTaskAsDone(element) : markTaskAsUnDone(element);
            if (pageState === 'Completed' && !target.checked) {
                elementHtml.style.display = 'none';
            }
            if (pageState === 'Active' && target.checked) {
                elementHtml.style.display = 'none';
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

        const modalChange = new ModalChangeTask({
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
        const element = document.getElementById(item.mainId);

        if (!item.isCompleted) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    })
})
document.getElementById('buttonCompleted').addEventListener('click', function completedClicked() {
    pageState = 'Completed';
    tasksObj.forEach(item => {
        const element = document.getElementById(item.mainId);

        if (item.isCompleted) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    })
})
document.getElementById('buttonClearCompleted').addEventListener('click', function clearCompletedClicked() {
    const completedObj = tasksObj.filter( item => item.isCompleted === true)

    completedObj.forEach( item => Task.removeTask(item.mainId));
})

document.getElementById('sort').addEventListener('click', function showUnshowSortBlock() {
    const element = document.getElementById('sortBlock');
    if (element.style.display === 'flex') {
        element.style.display = 'none';
    } else {
        element.style.display = 'flex';
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

document.getElementById('buttonFilter').addEventListener('click', function filterTasks() {
    const inputElem = document.getElementById('filterInput');
    const inputValue = inputElem.value;

    if (isValidEnter(inputValue)) {
        filterTask(inputValue);
    } else if (isValidDateEnter(inputValue)) {
        filterDate(inputValue);
    } else {
        markAsInvalid(inputElem);
    }
})
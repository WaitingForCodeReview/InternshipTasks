import {Task} from "./Task.js";
import {regex, taskInput, tasksObj, INVALID_DATE} from "./Variables.js";

export function isValidEnter(userEnter) {
    return userEnter.match(regex);
}

// gets and returns the current date
export function getCreationDate(currentDate) {
    return `${currentDate.getDate()}-${(currentDate.getMonth() + 1)}-${currentDate.getFullYear()}`
    // currentDate.getMonth() + 1 : because months are from 0 to 11, we need : 1 - 12
}

// calculates and returns the expiration date
export function getExpirationDate(currentDate) {
    const MAX_DAYS = 31;
    const START_VALUE = 1;
    const MAX_MONTHS = 12

    let expirationDay = currentDate.getDate() + 1,
        expirationMonth = currentDate.getMonth() + 1,
        expirationYear = currentDate.getFullYear();

    if (expirationDay > MAX_DAYS) {          // if more then days in month
        expirationDay = START_VALUE;         // then change on first day of month
        expirationMonth += START_VALUE;      // and change current month to the next month
    }
    if (expirationMonth > MAX_MONTHS) {  // if more then months in year
        expirationMonth = START_VALUE;   // then change on first month of year
        expirationYear += 1;             // and change current year to the next year
    }

    return `${expirationDay}-${expirationMonth}-${expirationYear}`
}

// creates a new instance of Task and adds it to the page
export function createTask() {
    const currentDate = new Date();

    const task = new Task({
        text : taskInput.value,
        creationDate : convertDateReadable(convertForInputDate(getCreationDate(currentDate))),
        expirationDate : convertDateReadable(convertForInputDate(getExpirationDate(currentDate))),
    });
    tasksObj.push(task);
    document.getElementById('tasks').innerHTML += task.getInnerHtml();
    taskInput.value = "";
}

// rejects the inputted value
export function rejectTask() {
    taskInput.style.color = 'red';
    taskInput.style.backgroundColor = ' rgba(255, 0, 0, 0.3)';
    setTimeout(()=>{
        taskInput.style.color = 'black';
        taskInput.style.backgroundColor = 'white';
    }, 2000);
}

// creates an input-'input-type'-group
export function createInputGroup({inputId, pText, inputType}) {
    return `
        <div class="groupCalendar">
            <p>${pText}<input id="${inputId}" type="${inputType}" required></p>
        </div>
   `
}

export function markTaskAsDone(taskObj) {
    const elem = document.getElementById(taskObj.divId);

    elem.style.textDecoration = 'line-through';
    elem.style.color = 'grey';
    taskObj.isCompleted = true;
}
export function markTaskAsUnDone(taskObj) {
    const elem = document.getElementById(taskObj.divId);

    elem.style.textDecoration = 'none';
    elem.style.color = 'black';
    taskObj.isCompleted = false;
}

export function isValidDate(dateStartString, dateEndString) {
    const dateStartObject = new Date(dateStartString);
    const dateEndObject = new Date(dateEndString);

    return ((Date.now() <= dateStartObject) && (dateStartObject <= dateEndObject));
}

export function convertDate(dateString) {
    return dateString.split('.').reverse().join('-');
}

export function convertDateReadable(dateString) {
    return dateString.split('-').reverse().join('-');
}


export function markAsInvalid(elem) {
    elem.style.color = 'red';
    elem.style.backgroundColor = ' rgba(255, 0, 0, 0.3)';
    setTimeout(() => {
        elem.style.color = 'black';
        elem.style.backgroundColor = 'white';
    }, 2000);
}

export function convertForInputDate(dateString) {
    // we have default : dd-mm-yyyy
    // need to return  : yyyy-mm-dd
    let dateArr = dateString.split('-').reverse(); //['yyyy', 'mm', 'dd']

    return dateArr.reduce( (acc, item) => {
        return (item.length === 1) ? acc + '-0' + item : acc + '-' + item;
    })
}

export function refactorTaskMarkup() {
    const tasksDivs = tasksObj.map( item => item.mainId);

    tasksDivs.forEach(item => Task.removeHtmlTask(item));
    tasksObj.forEach( item => document.getElementById('tasks').innerHTML += item.getInnerHtml());
    tasksObj.forEach( item => item.isCompleted ? markTaskAsDone(item) : markTaskAsUnDone(item));
}

export function isValidDateEnter(dateEnter) {
    return dateEnter.match(new RegExp("^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\\d{4}$"));
}

export function filterTask(inputValue) {
    const filtered = tasksObj.filter( item => item.text !== inputValue);

    refactorTaskMarkup();
    filtered.forEach( item => document.getElementById(item.mainId).style.display = 'none');
}

export function filterDate(inputValue) {
    const filtered = tasksObj.filter( item => item.creationDate !== inputValue);

    refactorTaskMarkup();
    filtered.forEach( item => document.getElementById(item.mainId).style.display = 'none');
}
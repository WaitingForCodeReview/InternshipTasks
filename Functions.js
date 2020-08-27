import {Task} from "./Task.js";
import {regex, taskInput, tasksObj, INVALID_DATE} from "./Variables.js";

export function isValidEnter(userEnter) {
    return userEnter.match(regex);
}

// gets and returns the current date
export function getCreationDate(currentDate) {
    return `
       ${currentDate.getDate()}-${(currentDate.getMonth() + 1)}-${currentDate.getFullYear()}
    `
    // currentDate.getMonth() + 1 : because months are from 0 to 11, we need : 1 - 12
}

// gets and returns the current time
export function getTime(currentTime) {
    return `
       ${currentTime.getHours()}:${currentTime.getMinutes()}
    `
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

    return `
        ${expirationDay}-${expirationMonth}-${expirationYear}
    `
}

// creates a new instance of Task and adds it to the page
export function createTask() {
    const currentDate = new Date();

    const task = new Task({
        text : taskInput.value,
        creationDate : getCreationDate(currentDate),
        creationTime : getTime(currentDate),
        expirationDate : getExpirationDate(currentDate),
        expirationTime : getTime(currentDate)
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

// creates an input-calendar-group
export function createInputGroup(inputId, pText) {
    return `
        <div class="groupCalendar">
            <p>${pText}<input id="${inputId}" type="date" required></p>
        </div>
   `
}

// creates an input-task-modal-group
export function createInputTask(inputId, pText) {
    return `
        <div class="groupCalendar">
            <p>${pText}<input id="${inputId}" type="text" required></p>
        </div>
   `
}

export function markTaskAsDone(taskId) {
    document.getElementById(taskId).style.textDecoration = 'line-through';
    document.getElementById(taskId).style.color = 'grey';
}
export function markTaskAsUnDone(taskId) {
    document.getElementById(taskId).style.textDecoration = 'none';
    document.getElementById(taskId).style.color = 'black';
}

export function isValidDate(dateStartString, dateEndString) {
    const dateStartObject = new Date(dateStartString);
    const dateEndObject = new Date(dateEndString);

    return ((Date.now() <= dateStartObject) && (dateStartObject <= dateEndObject));
}

export function convertDate(dateString) {
    const tempArr = dateString.split('.').reverse();

    return tempArr.join('-');
}

export function convertDateReadable(dateString) {
    return dateString.split('-').reverse().join('-');
}

export function isValidTime(timeEntered) {
    const timeRegex = new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);

    return timeEntered.match(timeRegex);
}

export function markAsInvalid(elem) {
    elem.style.color = 'red';
    elem.style.backgroundColor = ' rgba(255, 0, 0, 0.3)';
    setTimeout(() => {
        elem.style.color = 'black';
        elem.style.backgroundColor = 'white';
    }, 2000);
}

export function sliceElementText(elementText) {
    const SYMBOLS_BETWEEN = 2;
    const index = elementText.indexOf(': ');

    return elementText.substring(index + SYMBOLS_BETWEEN, elementText.length);
}

export function convertForInputDate(dateString) {
    // we have default : dd-mm-yyyy
    // need to return  : yyyy-mm-dd
    let dateArr = dateString.split('-').reverse(); //['yyyy', 'mm', 'dd']
    // if mm or dd has only 1 symbol, we need to add '0' to the its start
    dateArr.forEach( (item, i) => {
        if(item.length === 1) {
            dateArr[i] = '0' + item;
        }
    })
    return dateArr.join('-');
}
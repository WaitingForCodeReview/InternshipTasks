import {Task} from "./Task.js";
import {regex, taskInput, tasksObj, INVALID_DATE} from "./Variables.js";

export function isValidEnter(userEnter) {
    return userEnter.match(regex);
}

// gets and returns the current date
export function getCreationDate(currentDate) {
    return `
       ${currentDate.getDate()} /
       ${(currentDate.getMonth() + 1)} / 
       ${currentDate.getFullYear()}
    `
    // currentDate.getMonth() + 1 : because months are from 0 to 11, we need : 1 - 12
}

// gets and returns the current time
export function getTime(currentTime) {
    return `
       ${currentTime.getHours()} : 
       ${currentTime.getMinutes()}
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
        ${expirationDay} /
        ${expirationMonth} / 
        ${expirationYear}
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
            <p>${pText}<input id="${inputId}" class="datepicker" type="text" required></p>
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

export function isValidDate(dateStart, dateEnd) {
    return dateStart < dateEnd;
}

export function convertDate(dateString) {
    // split string with / to create ['mm','dd','yyyy']
    let tempArr = dateString.split('/');
    // replace 'dd' and 'mm' to get ['dd', 'mm', 'yyyy']
    [tempArr[0], tempArr[1]] = [tempArr[1], tempArr[0]];
    return new Date(tempArr.join('-'));
}
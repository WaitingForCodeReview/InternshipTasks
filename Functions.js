import {Task} from "./Task.js";
import {regex, taskInput, tasks} from "./Variables.js";

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

    const task = new Task(
        taskInput.value,
        getCreationDate(currentDate),
        getTime(currentDate),
        getExpirationDate(currentDate),
        getTime(currentDate)
    );
    tasks.push(task);
    document.getElementById('tasks').innerHTML += task.getInnerHtml();
    taskInput.value = "";
}

// rejects the inputted value
export function rejectTask() {
    taskInput.style.color = 'red';
    setTimeout(()=>{
        taskInput.style.color = 'black';
    }, 2000);
}

// creates an input-group
export function createInputGroup(inputId, labelText) {
    return `
        <div class="group">
            <input id="${inputId}" type="text" required>
            <label>${labelText}</label>
        </div>
   `
}
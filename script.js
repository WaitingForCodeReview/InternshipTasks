let tasks = [];

class Task {
    constructor(text, creationDate, creationTime, expirationDate, expirationTime) {
        this.text = text;
        this.creationDate = creationDate;
        this.creationTime = creationTime;
        this.expirationDate = expirationDate;
        this.expirationTime = expirationTime;
        tasks.push(this);
    }

    getInnerHtml() {
        return `
            <div style="width: 45%">
                <p>
                    Task: ${this.text} <br> 
                    Creation Date: ${this.creationDate} <br>
                    Creation Time: ${this.creationTime} <br>
                    Expiration Date: ${this.expirationDate} <br>
                    Expiration Time: ${this.expirationTime} <br> 
                </p>
            </div>
        `
    }
}


const regex = new RegExp("^[a-zA-Z0-9 ]+$");
const taskInput = document.getElementById('taskInput');

// checks the input
function isValidEnter(userEnter) {
    return userEnter.match(regex);
}

// gets and returns the current date
function getCreationDate(currentDate) {
    return `
       ${currentDate.getDate()} /
       ${(currentDate.getMonth() + 1)} / 
       ${currentDate.getFullYear()}
    `
    // currentDate.getMonth() + 1 : because months are from 0 to 11, we need : 1 - 12
}

// gets and returns the current time
function getTime(currentTime) {
    return `
       ${currentTime.getHours()} : 
       ${currentTime.getMinutes()}
    `
}

// calculates and returns the expiration date
function getExpirationDate(currentDate) {
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
function createTask() {
    const currentDate = new Date();

    const task = new Task(
        taskInput.value,
        getCreationDate(currentDate),
        getTime(currentDate),
        getExpirationDate(currentDate),
        getTime(currentDate)
    );

    document.getElementById('tasks').innerHTML += task.getInnerHtml();
    taskInput.value = "";
}

// rejects the inputted value
function rejectTask() {
    taskInput.style.color = 'red';
    setTimeout(()=>{
        taskInput.style.color = 'black';
    }, 2000);
}

taskInput.addEventListener('keydown', function inputEnterPressed(event) {
    if(event.code == 'Enter') {
        if(isValidEnter(taskInput.value)) {
            createTask();
        } else {
            rejectTask();
        }
    }
})

function createInputGroup(inputId, labelText) {
    return `
        <div class="group">
            <input id="${inputId}" type="text" required>
            <label>${labelText}</label>
        </div>
   `
}

class Modal {
    constructor(selfId, inputCreationId, inputExpirationId, inputCreationTimeId,
                inputExpirationTimeId, buttonOKId, buttonCANCELId, hText) {
        this.selfId = selfId;
        this.inputCreationId = inputCreationId;
        this.inputExpirationId = inputExpirationId;
        this.inputCreationTimeId = inputCreationTimeId;
        this.inputExpirationTimeId = inputExpirationTimeId;
        this.buttonOKId = buttonOKId;
        this.buttonCANCELId = buttonCANCELId;
        this.hText = hText;
    }
    initializeModal() {
        document.getElementById('forModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modal_content">
                    <h2>${this.hText}</h2>
                    
                    ${createInputGroup(this.inputCreationId, 'Creation Date')}
                    ${createInputGroup(this.inputExpirationId, 'Expiration Date')}
                    ${createInputGroup(this.inputCreationTimeId, 'Creation Time')}
                    ${createInputGroup(this.inputExpirationTimeId, 'Expiration Time')}
                    
                    <a href="#" class="buttonModal" id="${this.buttonOKId}">OK</a>
                    <a href="#" class="buttonModal" id="${this.buttonCANCELId}">CANCEL</a>
                </div>
            </div>
        `
    }

    static clearInputs(modal) {
        document.getElementById(modal.inputCreationId).value = "";
        document.getElementById(modal.inputExpirationId).value = "";
        document.getElementById(modal.inputCreationTimeId).value = "";
        document.getElementById(modal.inputExpirationTimeId).value = "";
    }

    static initializeHandlers(modal) {
        document.getElementById(modal.buttonOKId).addEventListener('click', function okClicked() {
            document.getElementById(modal.selfId).style.display = "none";

            if(isValidEnter(taskInput.value)) {
                const now = new Date();

                const task = new Task(
                    taskInput.value,
                    document.getElementById(modal.inputCreationId).value,
                    document.getElementById(modal.inputCreationTimeId).value,
                    document.getElementById(modal.inputExpirationId).value,
                    document.getElementById(modal.inputExpirationTimeId).value
                );

                document.getElementById('tasks').innerHTML += task.getInnerHtml();
                taskInput.value = "";
            } else {
                rejectTask();
            }

            Modal.clearInputs(modal);
        });

        document.getElementById(modal.buttonCANCELId).addEventListener('click', function cancelClicked() {
            document.getElementById(modal.selfId).style.display = "none";
            Modal.clearInputs(modal);
        });
    }

    visible() {
        document.getElementById(this.selfId).style.display = "block";
    }
}

let modal = new Modal('modal', 'inputCreation', 'inputExpiration', 'inputCreationTime',
                       'inputExpirationTime', 'buttonOK', 'buttonCANCEL', 'User-date,time-set');
modal.initializeModal();
Modal.initializeHandlers(modal);

const plusIcon = document.getElementById('plusImage');
plusIcon.addEventListener('click', function PlusIconClicked() {
    modal.visible();
});
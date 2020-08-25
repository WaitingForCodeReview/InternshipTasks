let isUserDate = false;
let creationDate, expirationDate;
let regex = new RegExp("^[a-zA-Z0-9]+$");

const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keydown', event => {
    if (event.code == 'Enter') {
        if(taskInput.value.match(regex)){
            let text;
            if(!isUserDate) {
                let now = new Date();
                let expirationDate = now.getDate() + 1, expirationMonth = now.getMonth() + 1,
                    expirationYear = now.getFullYear();
                if (now.getDate() == 31) {
                    expirationDate = 1;
                    expirationMonth += 1;
                    if (expirationMonth == 13) {
                        expirationMonth = 1;
                        expirationYear += 1;
                    }
                }
                text = taskInput.value
                    + '\n' + 'Date: '
                    + now.getDate() + '/'
                    + (now.getMonth() + 1) + '/'
                    + now.getFullYear() + '\n' + 'Time: '
                    + now.getHours() + ':'
                    + now.getMinutes() + '\n' + 'Expiration date : ';

                text += expirationDate
                    + '/' + expirationMonth
                    + '/' + expirationYear
                    + ', ' + now.getHours()
                    + ':' + now.getMinutes();
            } else {
                text = taskInput.value
                    + '\n' + 'Date: '
                    + creationDate + '\n'
                    + 'Expiration date : '
                    + expirationDate;
                isUserDate = false;
            }
            let p = document.createElement('p');
            p.innerText = text;
            document.getElementById('tasks').append(p);
            taskInput.value = "";
        } else {
            taskInput.style.color = 'red';
            setTimeout(()=>{
                taskInput.style.color = 'black';
            }, 2000);
        }
    }
});

const plusIcon = document.getElementById('plusImage');
const modal = document.getElementById("my_modal");
const modalBtnOK = document.getElementById("buttonOK");
const modalBtnCANCEL = document.getElementById("buttonCANCEL");
const creationDateInput = document.getElementById("creationDate");
const expirationDateInput = document.getElementById("expirationDate");

plusIcon.addEventListener('click', () => {
    modal.style.display = "block";
});
modalBtnOK.addEventListener("click", () => {
    isUserDate = true;
    creationDate = creationDateInput.value;
    if(creationDateInput.value == "") creationDate = 'No user creation date entered!'
    expirationDate = expirationDateInput.value;
    if(expirationDateInput.value == "") expirationDate = 'No user expiration date entered!'
    modal.style.display = "none";
    creationDateInput.value = "";
    expirationDateInput.value = "";


    if(taskInput.value.match(regex)){
        let text;
        if(!isUserDate) {
            let now = new Date();
            let expirationDate = now.getDate() + 1, expirationMonth = now.getMonth() + 1,
                expirationYear = now.getFullYear();
            if (now.getDate() == 31) {
                expirationDate = 1;
                expirationMonth += 1;
                if (expirationMonth == 13) {
                    expirationMonth = 1;
                    expirationYear += 1;
                }
            }
            text = taskInput.value
                + '\n' + 'Date: '
                + now.getDate() + '/'
                + (now.getMonth() + 1) + '/'
                + now.getFullYear() + '\n' + 'Time: '
                + now.getHours() + ':'
                + now.getMinutes() + '\n' + 'Expiration date : ';

            text += expirationDate
                + '/' + expirationMonth
                + '/' + expirationYear
                + ', ' + now.getHours()
                + ':' + now.getMinutes();
        } else {
            text = taskInput.value
                + '\n' + 'Date: '
                + creationDate + '\n'
                + 'Expiration date : '
                + expirationDate;
            isUserDate = false;
        }
        let p = document.createElement('p');
        p.innerText = text;
        document.getElementById('tasks').append(p);
        taskInput.value = "";
    } else {
        taskInput.style.color = 'red';
        setTimeout(()=>{
            taskInput.style.color = 'black';
        }, 2000);
    }
})
modalBtnCANCEL.addEventListener("click", () => {
    modal.style.display = "none";
    creationDateInput.value = "";
    expirationDateInput.value = "";
})

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
import {tasksObj} from "./Variables.js";

export class Task {
    text
    creationDate
    expirationDate

    constructor(taskData) {
        Object.assign(this, { ...taskData });

        this.taskTextId = `taskTextId${Task.getUniqueId()}`;
        this.creationDateId = `creationDateId${Task.getUniqueId()}`;
        this.expirationDateId = `expirationDateId${Task.getUniqueId()}`;
        this.pencilId = `pencil${Task.getUniqueId()}`
        this.checkBoxId = `checkbox${Task.getUniqueId()}`;
        this.divId = `divId${Task.getUniqueId()}`;
        this.paragraphId = `paragraphId${Task.getUniqueId()}`;
        this.mainId = `mainId${Task.getUniqueId()}`;
    }
    static getUniqueId() {
        return Date.now();
    }

    getInnerHtml() {
        return `
            <div style="width: 100%; display: flex;" id="${this.mainId}">
                <div style="width: 30%; padding-left: 2rem;" id="${this.divId}">
                    <p>
                        <strong id=${this.taskTextId}>Task: ${this.text}</strong> <br> 
                        <strong id=${this.creationDateId}>Creation Date: ${this.creationDate}</strong> <br>
                        <strong id=${this.expirationDateId}>Expiration Date: ${this.expirationDate}</strong> <br>
                    </p>
                </div>
                <div style="width: 45%; display: flex; flex-direction: column">
                    <div style="display: flex; padding-top: 1rem; height: 50px">
                        <i class="fas fa-edit" id="${this.pencilId}" style="padding-top: 0.7rem"></i>
                        <p id="${this.paragraphId}" class="crossbow" style=" padding-left: 1rem">&times</p>
                    </div>
                    <div style="width: 100%; height: 100%;">
                        <input type="checkbox" id="${this.checkBoxId}" style="width: 35%; height: 35%">
                    </div>
                </div>
            </div>
        `
    }

    static removeTask(taskDivId) {
        // remove from HTML
        document.getElementById(taskDivId).parentNode.removeChild(document.getElementById(taskDivId));

        // remove from Tasks array
        const removeElemIndex = tasksObj.findIndex( item => item.mainId === taskDivId);
        tasksObj.splice(removeElemIndex, 1);
    }

    static replaceTaskWithChanged(changedObject) {
        const removeElemIndex = tasksObj.findIndex(item => item.mainId === changedObject.mainId);

        tasksObj.splice(removeElemIndex, 1, changedObject);
    }
}
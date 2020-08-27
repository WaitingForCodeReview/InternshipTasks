import {tasksObj} from "./Variables.js";

export class Task {
    text
    creationDate
    creationTime
    expirationDate
    expirationTime

    constructor(taskData) {
        Object.assign(this, { ...taskData });

        this.taskTextId = `taskTextId${Task.getUniqueId()}`;
        this.creationDateId = `creationDateId${Task.getUniqueId()}`;
        this.creationTimeId = `creationTimeId${Task.getUniqueId()}`;
        this.expirationDateId = `expirationDateId${Task.getUniqueId()}`;
        this.expirationTimeId = `expirationTimeId${Task.getUniqueId()}`;
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
            <div style="display: flex" id="${this.mainId}">
                <div style="width: 45%" id="${this.divId}">
                    <p>
                        <strong id=${this.taskTextId}>Task: ${this.text}</strong> <br> 
                        <strong id=${this.creationDateId}>Creation Date: ${this.creationDate}</strong> <br>
                        <strong id=${this.creationTimeId}>Creation Time: ${this.creationTime}</strong> <br>
                        <strong id=${this.expirationDateId}>Expiration Date: ${this.expirationDate}</strong> <br>
                        <strong id=${this.expirationTimeId}>Expiration Time: ${this.expirationTime}</strong> <br> 
                    </p>
                </div>
                <div style="width: 45%;">
                    <div class="pencil">
                        <i class="fas fa-edit" id="${this.pencilId}"></i>
                    </div>
                    <p id="${this.paragraphId}" class="crossbow" style="margin-left: -3rem; margin-top: 1rem; width: 10px;">&times</p>
                    <input type="checkbox" id="${this.checkBoxId}" style="width: 25%; height: 25%; margin-top: -7%; margin-left: -10rem;">
                </div>
            </div>
        `
    }

    getInnerHtmlModal() {
        return `
            <div style="display: flex" id="${this.mainId}">
                <div style="width: 45%" id="${this.divId}">
                    <p>
                        <strong id=${this.taskTextId}>Task: ${this.text}</strong> <br> 
                        <strong id=${this.creationDateId}>Creation Date: ${this.creationDate}</strong> <br>
                        <strong id=${this.expirationDateId}>Expiration Date: ${this.expirationDate}</strong> <br>
                    </p>
                </div>
                <div style="width: 45%;">
                    <div class="pencil">
                        <i class="fas fa-edit" id="${this.pencilId}"></i>
                    </div>
                    <p id="${this.paragraphId}" class="crossbow" style="margin-left: -3rem; margin-top: 1rem; width: 10px;">&times</p>
                    <input type="checkbox" id="${this.checkBoxId}" style="width: 25%; height: 25%; margin-top: -7%; margin-left: -10rem;">
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

}
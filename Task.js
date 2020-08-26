export class Task {
    constructor(text, creationDate, creationTime, expirationDate, expirationTime, checkBoxId, divId) {
        this.text = text;
        this.creationDate = creationDate;
        this.creationTime = creationTime;
        this.expirationDate = expirationDate;
        this.expirationTime = expirationTime;
        this.checkBoxId = checkBoxId;
        this.divId = divId;
    }

    getInnerHtml() {
        return `
            <div style="display: flex">
                <div style="width: 45%" id="${this.divId}">
                    <p>
                        Task: ${this.text} <br> 
                        Creation Date: ${this.creationDate} <br>
                        Creation Time: ${this.creationTime} <br>
                        Expiration Date: ${this.expirationDate} <br>
                        Expiration Time: ${this.expirationTime} <br> 
                    </p>
                </div>
                <div style="width: 45%;">
                    <input type="checkbox" id="${this.checkBoxId}" style="width: 25%; height: 25%; margin-top: 15%; margin-left: -10rem;">
                </div>
            </div>
        `
    }
}
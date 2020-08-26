export class Task {
    constructor(text, creationDate, creationTime, expirationDate, expirationTime) {
        this.text = text;
        this.creationDate = creationDate;
        this.creationTime = creationTime;
        this.expirationDate = expirationDate;
        this.expirationTime = expirationTime;
        this.checkBoxId = `checkbox${this.getUniqueId()}`;
        this.divId = `divId${this.getUniqueId()}`;
        this.paragraphId = `paragraphId${this.getUniqueId()}`;
        this.mainId = `mainId${this.getUniqueId()}`;
    }
    getUniqueId() {
        return Date.now();
    }

    getInnerHtml() {
        return `
            <div style="display: flex" id="${this.mainId}">
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
                    <p id="${this.paragraphId}" class="crossbow" style="margin-left: -3rem; margin-top: 1rem;">&times</p>
                    <input type="checkbox" id="${this.checkBoxId}" style="width: 25%; height: 25%; margin-top: -7%; margin-left: -10rem;">
                </div>
            </div>
        `
    }
}
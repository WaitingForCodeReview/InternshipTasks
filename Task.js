export class Task {
    constructor(text, creationDate, creationTime, expirationDate, expirationTime) {
        this.text = text;
        this.creationDate = creationDate;
        this.creationTime = creationTime;
        this.expirationDate = expirationDate;
        this.expirationTime = expirationTime;
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
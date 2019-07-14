export class Mensaje {
    message: string;
    type: string;
    cssClass: string;

    constructor(message, type, cssClass) {
        this.message = message;
        this.type = type;
        this.cssClass = cssClass;
    }

}

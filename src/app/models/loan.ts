export class Loan {
    constructor(public loaner, public itemOwnerName, public formattedDate, public timeInMillis) {

    }
    getLoaner() {
        return this.loaner;
    }

    getItemOwnerName() {
        return this.itemOwnerName;
    }

    getFormattedDate() {
        return this.formattedDate;
    }

    getTimeInMillis() {
        return this.timeInMillis;
    }

}
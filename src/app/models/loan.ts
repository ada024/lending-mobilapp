export class Loan {
    constructor(public loaner, public itemOwnerName, public formattedDate, public timeInMillis, public status = "Out") {

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

    getStatus() {
        return this.status;
    }

}
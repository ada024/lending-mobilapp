export class Loan {
    constructor(public loaner, public loanerName, public itemOwnerName, public formattedDate, public timeInMillis) {

    }
    getLoaner() {
        return this.loaner;
    }

    getLoanerName() {
        return this.loanerName;
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
export class Loan {
    constructor(public userPhoto, public userEmail, public loaner, public loanerName, public itemOwnerName, public formattedDate, public formattedShortDate, public timeInMillis) {

    }

    getUserPhoto() {
        return this.userPhoto;
    }

    getUserEmail() {
        return this.userEmail;
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

    getFormattedShortDate() {
        return this.formattedShortDate;
    }

    getTimeInMillis() {
        return this.timeInMillis;
    }

    

}
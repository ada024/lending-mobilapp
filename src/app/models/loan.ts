export class Loan {
    constructor(public entityName, public userPhoto, public userEmail, public loaner, public loanerName, public itemOwnerName, public formattedDate, public formattedShortDate, public timeInMillis) {

    }

    getEntityName() {
        return this.entityName;
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
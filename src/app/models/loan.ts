export class Loan {
    constructor(public loaner, public itemOwnerName) {

    }
    getLoaner() {
        return this.loaner;
    }

    getItemOwnerName() {
        return this.itemOwnerName;
    }

}
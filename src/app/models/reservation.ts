export class Reservation {
    constructor(public userId: String, public pickupDate: Date, public formattedpUpDate: String, public returnDate: Date, public formattedRetDate) {

    }

    getUserId() {
        return this.userId;
    }

    getPickupDate() {
        return this.pickupDate;
    }

    getFormattedDate() {
        return this.formattedpUpDate;
    }

    getReturnDate() {
        return this.returnDate;
    }

    getFormattedRetDate() {
        return this.formattedRetDate;
    }

    
}
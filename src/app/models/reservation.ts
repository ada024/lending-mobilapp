export class Reservation {
    constructor(public userId: String, public pickupDate: Date, public formattedDate: String) {

    }

    getUserId() {
        return this.userId;
    }

    getPickupDate() {
        return this.pickupDate;
    }

    getFormattedDate() {
        return this.formattedDate;
    }

    
}
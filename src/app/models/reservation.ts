export class Reservation {
    constructor(public userId: String, public pickupDate: Date) {

    }
    getUserId() {
        return this.userId;
    }

    getPickupDate() {
        return this.pickupDate;
    }
}
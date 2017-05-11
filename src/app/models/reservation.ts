export class Reservation {
    constructor(public userId: String, public pickupDate: Date, public formattedpUpDate: String, public returnDate: any, public formattedRetDate, public itemName, public itemPhoto) {

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

    getItemName(){
        return this.itemName;
    }

     getItemPhoto(){
        return this.itemPhoto;
    }

    
}
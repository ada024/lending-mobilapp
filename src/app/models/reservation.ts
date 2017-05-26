export class Reservation {
    constructor(public userPhoto, public userEmail, public itemKey, public userId: String, public userName: String, public pickupDate: Date, public formattedpUpDate: String, public formattedShortpUpDate: String, public returnDate: any, public formattedRetDate, public formattedShortRetDate, public itemName, public itemPhoto) {

    }

    getUserPhoto() {
        return this.userPhoto;
    }

    getUserEmail() {
        return this.userEmail;
    }

    getItemKey() {
        return this.itemKey;
    }

    getUserId() {
        return this.userId;
    }

   getUserName() {
        return this.userId;
    }
    getPickupDate() {
        return this.pickupDate;
    }

    getFormattedDate() {
        return this.formattedpUpDate;
    }

    getFormattedShortpUpDate() {
        return this.formattedpUpDate;
    }

    getReturnDate() {
        return this.returnDate;
    }

    getFormattedRetDate() {
        return this.formattedRetDate;
    }

    getFormattedShortRetDate() {
        return this.formattedRetDate;
    }

    getItemName(){
        return this.itemName;
    }

     getItemPhoto(){
        return this.itemPhoto;
    }

    
}
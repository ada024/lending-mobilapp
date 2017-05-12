export class Reservation {
    resList = [];
    constructor() {

    }

    addReservation(reservation){
        this.resList.push(reservation);
    }

    getReservations(){
        return this.resList;
    }

    
}
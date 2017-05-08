export class EntityOffice {
    constructor(public location, public room, public days, public hours) {

    }
    getLocation() {
        return this.location;
    }

    getRoom() {
        return this.room;
    }

    getDays() {
        return this.days;
    }

    gethours() {
        return this.hours;
    }

}
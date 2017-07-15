export class EntityOffice {
    constructor(public location, public room, public days, public fromHours, public toHours) {

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

    getFromHours() {
        return this.fromHours;
    }

    getToHours() {
        return this.toHours;
    }

}
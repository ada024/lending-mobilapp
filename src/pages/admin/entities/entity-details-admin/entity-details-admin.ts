import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-entity-details-admin',
  templateUrl: 'entity-details-admin.html'
})
export class EntityDetailsAdminPage {
currentEntity: any;
currentEntityLocation: any;
currentEntityRoom: any;
currentEntityHours: any;
currentEntityDays: any;
modifyLocation = false;
modifyRoom = false;
modifyDays = false;
modifyHours = false;
notAdded1 = false;
notAdded2=false;

entityLocation="";
entityRoom="";
entityHoursFrom="";
entityHoursTo="";
entityDays="";
entityHours="";
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
     //this.currentEntity = navParams.get("entity");
     db.getEntity(this.onEntityLoaded.bind(this));
     
  }

onEntityLoaded(entity){
    this.currentEntity = entity[0];
    this.currentEntityLocation = this.currentEntity.office.location;
     this.currentEntityRoom = this.currentEntity.office.room;
     this.currentEntityHours = this.currentEntity.office.hours;
     this.currentEntityDays = this.getWeekDays(this.currentEntity.office.days.length);
}


editLocation(){
    if(this.entityLocation.length!=0){
    this.db.editLocation(this.entityLocation);
    this.modifyLocation= false;
}
this.modifyLocation = false;
}

editRoom(){
    if(this.entityRoom.length!=0){
    this.db.editRoom(this.entityRoom);
    this.modifyRoom= false;
}
this.modifyRoom = false;
}

editDays(){
    if(this.entityDays.length!=0){
    this.db.editDays(this.entityDays);
    this.modifyDays= false;
}
else this.modifyDays = false;
}

editHours(){
    this.entityHours = this.entityHoursFrom + " - " + this.entityHoursTo;
    if(this.entityHoursFrom.length!=0 && this.entityHoursTo.length!=0){
    this.db.editHours(this.entityHours);
    this.modifyHours= false;
}
else this.modifyHours = false;

}




getWeekDays(n) {
      var weekday = new Array(7);
      weekday[0] = "Sundays";
      weekday[1] = "Mondays";
      weekday[2] = "Tuesdays";
      weekday[3] = "Wednesdays";
      weekday[4] = "Thursdays";
      weekday[5] = "Fridays";
      weekday[6] = "Saturdays";

      var days = this.currentEntity.office.days;

      var dayInfo = null;
      if (n == 1) {
          dayInfo = weekday[days[0]];
      }
      if (n == 2) {
          dayInfo = weekday[days[0]] + " and " +  weekday[days[1]];
      }
      if (n == 3) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + " and " + weekday[days[2]];
      }
      if (n == 4) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + ", " + weekday[days[2]] + " and " + weekday[days[3]];
      }
      if (n == 5) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + ", " + weekday[days[2]] + ", " + weekday[days[3]] + " and " + weekday[days[4]];
      }
      if (n == 6) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + ", " + weekday[days[2]] + ", " + weekday[days[3]] + ", " + weekday[days[4]] + " and " + weekday[days[5]];
      }
      if (n == 7) {
          dayInfo = "Every day"
      }

      return dayInfo;
  }

}

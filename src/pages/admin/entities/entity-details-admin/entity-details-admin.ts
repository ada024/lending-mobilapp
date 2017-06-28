import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import {TermsAndConditionsDetailsPage} from '../terms-and-conditions-details/terms-and-conditions-details';


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
modifyResDays = false;
notAdded1 = false;
notAdded2=false;

entityHoursFrom="";
entityHoursTo="";
entityDays="";
entityHours="";
resDays="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, 
  public alertCtrl: AlertController, public db: DatabaseService) {
     db.getEntity(this.onEntityLoaded.bind(this));
     
  }

onEntityLoaded(entity){
    if(entity[0]){
        this.currentEntity = entity[0];
        this.currentEntityLocation = this.currentEntity.office.location;
        this.currentEntityRoom = this.currentEntity.office.room;
        this.currentEntityHours = this.currentEntity.office.hours;
        this.currentEntityDays = this.getWeekDays(this.currentEntity.office.days.length);
        if(this.currentEntity.reservationDays!=null){
            this.resDays = this.currentEntity.reservationDays;
        }
    }
}


editLocation(){
    if(this.currentEntityLocation.length!=0){
    this.db.editLocation(this.currentEntityLocation);
    this.modifyLocation= false;
}
this.modifyLocation = false;
}

editRoom(){
    if(this.currentEntityRoom.length!=0){
    this.db.editRoom(this.currentEntityRoom);
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

editResDays(){
    if(this.resDays.length!=0){
    this.db.editResDays(this.resDays);
    this.modifyResDays= false;
}
else this.modifyResDays = false;

}

goToTermsAndConditions(){
this.navCtrl.push(TermsAndConditionsDetailsPage, {entity:this.currentEntity});
}

locationHandler(keyCode){
if(keyCode==13){
this.editLocation();
}
}

roomHandler(keyCode){
if(keyCode==13){
this.editRoom();
}
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

  delete() {
      this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete this entity? This will delete all items in this entity and all current loans and reservations',
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
            this.db.deleteEntity(this.currentEntity);
            this.navCtrl.popToRoot();
        }
      }
      ]
    }).present();
  }

}

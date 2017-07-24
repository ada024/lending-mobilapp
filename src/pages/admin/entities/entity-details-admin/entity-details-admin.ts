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
currentEntityTitle: any;
currentEntityLocation: any;
currentEntityRoom: any;
currentEntityHours: any;
modifyTitle = false;
modifyLocation = false;
modifyRoom = false;
modifyDays = false;
modifyHours = false;
modifyResDays = false;
notAdded1 = false;
notAdded2=false;

fromHours = new Array(7);
toHours = new Array(7);

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
        this.currentEntityTitle = this.currentEntity.name;
        this.currentEntityLocation = this.currentEntity.office.location;
        this.currentEntityRoom = this.currentEntity.office.room;
        this.currentEntityHours = this.currentEntity.office.hours;
        if(this.currentEntity.reservationDays!=null){
            this.resDays = this.currentEntity.reservationDays;
        }
    }
}

editTitle(){
 if(this.currentEntityTitle.length!=0){
    this.db.editTitle(this.currentEntityTitle);
    this.modifyTitle= false;
}
this.modifyTitle = false;
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
    if(this.fromHours!=null && this.toHours!=null){
    this.db.editHours(this.fromHours, this.toHours);
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

titleHandler(keyCode){
if(keyCode==13){
this.editTitle();
}
}

getWeekDay(n){
    var weekday = new Array(7);
      weekday[0] = "Sundays";
      weekday[1] = "Mondays";
      weekday[2] = "Tuesdays";
      weekday[3] = "Wednesdays";
      weekday[4] = "Thursdays";
      weekday[5] = "Fridays";
      weekday[6] = "Saturdays";

      return weekday[n];
}

getHours(n){
    if(this.currentEntity.office.fromHours!=null && this.currentEntity.office.toHours!=null){
   var hoursFrom = this.currentEntity.office.fromHours;
   var hoursTo = this.currentEntity.office.toHours;

if(hoursFrom[n]!=null || hoursTo[n]!=null){
    return hoursFrom[n] + "-" + hoursTo[n];
}  else return "undefined";

   }
 
else return "undefined";
}


  delete() {
      this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete this library? This will delete all items in this library and all current loans and reservations',
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

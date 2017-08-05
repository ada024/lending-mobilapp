import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import {TermsAndConditionsUserPage} from '../terms-and-conditions-user/terms-and-conditions-user';


@Component({
  selector: 'page-entity-details-user',
  templateUrl: 'entity-details-user.html'
})
export class EntityDetailsUserPage {
currentEntity;
currentEntityLocation;
currentEntityRoom;
currentEntityHours;

  constructor(public navCtrl: NavController, public navParams: NavParams , public db: DatabaseService) { 
    db.getEntity(this.onEntityLoaded.bind(this));
     
  }

onEntityLoaded(entity){
    this.currentEntity = entity[0];
    this.currentEntityLocation = this.currentEntity.office.location;
     this.currentEntityRoom = this.currentEntity.office.room;
     this.currentEntityHours = this.currentEntity.office.hours;
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
    return hoursFrom[n] + " - " + hoursTo[n];
}  else return "undefined";

   }
 
else return "undefined";
}

goToTermsAndConditions(){
    this.navCtrl.push(TermsAndConditionsUserPage, {entity: this.currentEntity});
}
}

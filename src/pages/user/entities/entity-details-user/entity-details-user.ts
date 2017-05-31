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
currentEntityDays;

  constructor(public navCtrl: NavController, public navParams: NavParams , public db: DatabaseService) { 
    db.getEntity(this.onEntityLoaded.bind(this));
     
  }

onEntityLoaded(entity){
    this.currentEntity = entity[0];
    console.log("Entityname: " + this.currentEntity.name);
    this.currentEntityLocation = this.currentEntity.office.location;
     this.currentEntityRoom = this.currentEntity.office.room;
     this.currentEntityHours = this.currentEntity.office.hours;
     this.currentEntityDays = this.getWeekDays(this.currentEntity.office.days.length);
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


goToTermsAndConditions(){
    this.navCtrl.push(TermsAndConditionsUserPage, {entity: this.currentEntity});
}
}

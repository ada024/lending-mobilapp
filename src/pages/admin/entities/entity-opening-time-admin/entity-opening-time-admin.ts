import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityOffice } from '../../../../app/models/entityOffice';
import { EntityStandardReservationPage } from '../entity-standard-reservation/entity-standard-reservation';


@Component({
  selector: 'page-entity-opening-time-admin',
  templateUrl: 'entity-opening-time-admin.html'
})
export class EntityOpeningTimeAdminPage {
    entityName;
    entityLocation;
    entityRoom;
    entityDays = "";
    entityHoursFrom = "";
    entityHoursTo = "";
    entityHours;
    notAdded1: boolean;
    notAdded2: boolean;
    notAdded3: boolean;

    daysPicked = false;
    modifyHours = true;

    fromHours = new Array(7);
    toHours = new Array(7);

    officeInfo;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.entityName = navParams.get("entityName");
        this.entityLocation = navParams.get("entityLocation");
        this.entityRoom = navParams.get("entityRoom");
    }
    

  addEntity() {
      this.officeInfo = new EntityOffice(this.entityLocation, this.entityRoom, this.entityDays, this.fromHours, this.toHours);
      if (this.entityDays.length != 0) {
          this.navCtrl.push(EntityStandardReservationPage, {entityName: this.entityName, office: this.officeInfo});
          this.navCtrl.remove(2, 3);
      }
      if (this.entityDays.length == 0) {
          this.notAdded1 = true;
      }
      else this.notAdded1 = false;
  }

  daysChanged(){
      this.daysPicked=true;
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
if(this.fromHours[n]!=null || this.toHours[n]!=null){
    return this.fromHours[n] + "-" + this.toHours[n];
}  else return "undefined";

}
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

/*
  Generated class for the EntityStandardReservation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-entity-standard-reservation',
  templateUrl: 'entity-standard-reservation.html'
})
export class EntityStandardReservationPage {
entityOffice: any;
entityName: any;
entityDays: any;
reservationDays: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
this.entityOffice = navParams.get("office");
this.entityName = navParams.get("entityName");
console.log("entityDays: " + this.entityOffice.days);
this.entityDays = this.getWeekDays(this.entityOffice.days.length);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityStandardReservationPage');
  }

addEntity(){
this.db.addEntity(this.entityName, this.entityOffice, this.reservationDays);
this.navCtrl.remove(2, 4);
this.navCtrl.pop();
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

      var days = this.entityOffice.days;

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

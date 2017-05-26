import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import {TermsAndConditionsPage} from '../terms-and-conditions/terms-and-conditions';


@Component({
  selector: 'page-entity-standard-reservation',
  templateUrl: 'entity-standard-reservation.html'
})
export class EntityStandardReservationPage {
entityOffice: any;
entityName: any;
entityDays: any;
reservationDays: any;

emptyResDays=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, 
  public menu: DropDownMenuService, public alertCtrl: AlertController) {
this.entityOffice = navParams.get("office");
this.entityName = navParams.get("entityName");
console.log("entityDays: " + this.entityOffice.days);
this.entityDays = this.getWeekDays(this.entityOffice.days.length);
  }


addEntity(){
    if(this.reservationDays!=null){
this.presentConfirm();
    }
    
this.emptyResDays=true;
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


presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Terms and conditions?',
    message: 'Do you want to add terms and conditions for this entity?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.db.addEntity(this.entityName, this.entityOffice, this.reservationDays, null).then(resolve => {
            this.db.setEntity({$key: resolve.key, name: this.entityName});
          });
          this.navCtrl.remove(2, 4);
          this.navCtrl.pop();
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.navCtrl.push(TermsAndConditionsPage, {entityName:this.entityName, entityOffice:this.entityOffice, resDays:this.reservationDays});
        }
      }
    ]
  });
  alert.present();
}

}

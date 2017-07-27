import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public alertCtrl: AlertController) {
this.entityOffice = navParams.get("office");
this.entityName = navParams.get("entityName");
  }


addEntity(){
    if(this.reservationDays!=null && this.reservationDays.length!=0){
this.presentConfirm();
    } else this.emptyResDays=true;
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
if(this.entityOffice.fromHours!=null && this.entityOffice.toHours!=null){
   var hoursFrom = this.entityOffice.fromHours;
   var hoursTo = this.entityOffice.toHours;

if(hoursFrom[n]!=null || hoursTo[n]!=null){
    return hoursFrom[n] + " - " + hoursTo[n];
}  else return "undefined";

   }
 
else return "undefined";
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
          this.navCtrl.popToRoot();
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

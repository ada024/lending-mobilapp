import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import {TermsAndConditionsUserPage} from '../terms-and-conditions-user/terms-and-conditions-user';


@Component({
  selector: 'page-entity-join-user',
  templateUrl: 'entity-join-user.html'
})
export class EntityJoinUserPage {
  entity;
  isPending = false;
  hasJoined = false;
  firstAnswerLoaded = false;
  bothAnswersLoaded = false;
  
  currentEntity;
  currentEntityLocation;
  currentEntityRoom;
  currentEntityHours;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
   public zone: NgZone, public db: DatabaseService) {
    this.entity = navParams.get("entity");
    db.isPending(this.entity, this.onAnswerLoaded1.bind(this));
    db.hasJoined(this.entity, this.onAnswerLoaded2.bind(this));
    
    this.currentEntity=this.entity;
    this.currentEntityLocation = this.entity.office.location;
    this.currentEntityRoom = this.entity.office.room;
    this.currentEntityHours = this.entity.office.hours;
  }

  onAnswerLoaded1(answer) {
    this.zone.run(() => {
      this.isPending = answer;
      if(!this.firstAnswerLoaded)
        this.firstAnswerLoaded = true;
      else
        this.bothAnswersLoaded = true;
    });
  }

  onAnswerLoaded2(answer) {
    this.zone.run(() => {
      this.hasJoined = answer;
      if(!this.firstAnswerLoaded)
        this.firstAnswerLoaded = true;
      else
        this.bothAnswersLoaded = true;
    });
  }

  sendRequest() {
    if (this.entity.termsAndConditions != null) {
      this.alertCtrl.create({
        title: 'Confirm',
        message: 'By joining this entity you agree to the Terms and Conditions below',
        buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Agree',
          handler: () => {
            this.db.addPendingUser(this.entity);
          }
        }
        ]
      }).present();
    }
    else {
      this.db.addPendingUser(this.entity);
    }
  }

  goToTermsAndConditions(){
    this.navCtrl.push(TermsAndConditionsUserPage, {entity:this.entity});
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
if(this.entity.office.fromHours!=null && this.entity.office.toHours!=null){
   var hoursFrom = this.entity.office.fromHours;
   var hoursTo = this.entity.office.toHours;

if(hoursFrom[n]!=null || hoursTo[n]!=null){
    return hoursFrom[n] + " - " + hoursTo[n];
}  else return "undefined";

   }
 
else return "undefined";
}

}

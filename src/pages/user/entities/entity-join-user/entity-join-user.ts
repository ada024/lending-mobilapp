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
  
  currentEntityLocation;
  currentEntityRoom;
  currentEntityHours;
  currentEntityDays;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
   public zone: NgZone, public db: DatabaseService) {
    this.entity = navParams.get("entity");
    db.isPending(this.entity, this.onAnswerLoaded1.bind(this));
    db.hasJoined(this.entity, this.onAnswerLoaded2.bind(this));

    this.currentEntityLocation = this.entity.office.location;
    this.currentEntityRoom = this.entity.office.room;
    this.currentEntityHours = this.entity.office.hours;
    this.currentEntityDays = this.getWeekDays(this.entity.office.days.length);
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
  getWeekDays(n) {
      var weekday = new Array(7);
      weekday[0] = "Sundays";
      weekday[1] = "Mondays";
      weekday[2] = "Tuesdays";
      weekday[3] = "Wednesdays";
      weekday[4] = "Thursdays";
      weekday[5] = "Fridays";
      weekday[6] = "Saturdays";

      var days = this.entity.office.days;

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

import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public zone: NgZone, public db: DatabaseService) {
    this.entity = navParams.get("entity");
    db.isPending(this.entity, this.onAnswerLoaded1.bind(this));
    db.hasJoined(this.entity, this.onAnswerLoaded2.bind(this));
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
    this.db.addPendingUser(this.entity);
  }

  goToTermsAndConditions(){
    this.navCtrl.push(TermsAndConditionsUserPage, {entity:this.entity});
  }
}

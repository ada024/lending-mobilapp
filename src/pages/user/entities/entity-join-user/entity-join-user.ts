import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-entity-join-user',
  templateUrl: 'entity-join-user.html'
})
export class EntityJoinUserPage {
  entity;
  isPending = false;
  hasJoined = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public zone: NgZone, public db: DatabaseService) {
    this.entity = navParams.get("entity");
    db.isPending(this.entity, this.onAnswerLoaded1.bind(this));
    db.hasJoined(this.entity, this.onAnswerLoaded2.bind(this));
  }

  onAnswerLoaded1(answer) {
    this.zone.run(() => {
      this.isPending = answer;
    });
  }

  onAnswerLoaded2(answer) {
    this.zone.run(() => {
      this.hasJoined = answer;
    });
  }

  sendRequest() {
    this.db.addPendingUser(this.entity);
  }
}

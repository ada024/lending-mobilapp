import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityListUserPage } from '../entity-list-user/entity-list-user';


@Component({
  selector: 'page-entity-user',
  templateUrl: 'entity-user.html'
})
export class EntityUserPage {
  currentUserName = "";
  currentUserEntity = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    this.db.loadCurrentUser(this.onDataLoaded.bind(this));
  }

  onDataLoaded(data) {
    this.zone.run(() => {
      this.currentUserName = data.name;
      this.currentUserEntity = data.entity;
    });
  }

  goToEntityListUserPage() {
    this.navCtrl.push(EntityListUserPage);
  }

}

import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityListUserPage } from '../entity-list-user/entity-list-user';


@Component({
  selector: 'page-entity-user',
  templateUrl: 'entity-user.html'
})
export class EntityUserPage {
  currentUser = "";
  currentEntity = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    this.db.loadCurrentEntity(this.onDataLoaded.bind(this));
    this.currentUser = this.db.currentUserName;
  }

  onDataLoaded(data) {
    this.zone.run(() => {
      this.currentEntity = data;
    });
  }

  goToEntityListUserPage() {
    this.navCtrl.push(EntityListUserPage);
  }

}

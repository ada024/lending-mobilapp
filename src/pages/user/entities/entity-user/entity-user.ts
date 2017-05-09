import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityListUserPage } from '../entity-list-user/entity-list-user';
import { EntityChangeUserPage } from '../entity-change-user/entity-change-user';
import {EntityDetailsUserPage} from '../entity-details-user/entity-details-user';


@Component({
  selector: 'page-entity-user',
  templateUrl: 'entity-user.html'
})
export class EntityUserPage {
  currentUserName = "";
  currentUserEntity = "";
  currentEntity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    db.loadCurrentUser(this.onDataLoaded.bind(this));
    db.getEntity(this.onEntityLoaded.bind(this));
  }

  onDataLoaded(data) {
    this.zone.run(() => {
      this.currentUserName = data.fullname;
      this.currentUserEntity = data.entityName;
    });
  }

  onEntityLoaded(entity){
this.currentEntity = entity[0];
  }

  goToEntityChangeUserPage() {
    this.navCtrl.push(EntityChangeUserPage);
  }

  goToEntityListUserPage() {
    this.navCtrl.push(EntityListUserPage);
  }

  goToEntityDetailsUserPage(){
    if(this.currentUserEntity!="No entity"){
    this.navCtrl.push(EntityDetailsUserPage);
    }
  }

}

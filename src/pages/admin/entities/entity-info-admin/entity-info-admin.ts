import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityAddAdminPage } from '../entity-add-admin/entity-add-admin';


@Component({
  selector: 'page-entity-info-admin',
  templateUrl: 'entity-info-admin.html'
})
export class EntityInfoAdminPage {
  enableAddButton = false;
  numberOfEntitiesYouOwn;
  numberOfMaxEntities;
  numberOfMaxEntitiesPlussOne;
  numberOfEntitiesYouOwn_and_numberOfMaxEntities_loaded;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService) {
    db.loadNumberOfEntitiesYouOwn(this.onNumberOfEntitiesYouOwn.bind(this));
    db.loadnumberOfMaxEntities(this.onNumberOfMaxEntities.bind(this));
  }

  onNumberOfEntitiesYouOwn(numberOfEntitiesYouOwn){
    this.zone.run(() => {
      if(numberOfEntitiesYouOwn) {
        this.numberOfEntitiesYouOwn = numberOfEntitiesYouOwn;
      }
      else {
        this.numberOfEntitiesYouOwn = "0";
      }
      if(this.numberOfMaxEntities) {
        if((parseInt(this.numberOfEntitiesYouOwn)) < (parseInt(this.numberOfMaxEntities)) ) {
          this.enableAddButton = true;
        }
        else {
          this.enableAddButton = false;
        }
        this.numberOfEntitiesYouOwn_and_numberOfMaxEntities_loaded = true;
      }
    });
  }

  onNumberOfMaxEntities(numberOfMaxEntities){
    this.zone.run(() => {
      if(numberOfMaxEntities) {
        this.numberOfMaxEntities = numberOfMaxEntities;
        this.numberOfMaxEntitiesPlussOne = (parseInt(numberOfMaxEntities) + 1).toString();
      }
      else {
        this.numberOfMaxEntities = "0";
        this.numberOfMaxEntitiesPlussOne = "1";
      }
      if(this.numberOfEntitiesYouOwn) {
        if((parseInt(this.numberOfEntitiesYouOwn)) < (parseInt(this.numberOfMaxEntities)) ) {
          this.enableAddButton = true;
        }
        else {
          this.enableAddButton = false;
        }
        this.numberOfEntitiesYouOwn_and_numberOfMaxEntities_loaded = true;
      }
    });
  }

  goToEntityAddAdminPage() {
      this.navCtrl.push(EntityAddAdminPage);
  }

  purchase() {
    this.db.purchase();
  }

}
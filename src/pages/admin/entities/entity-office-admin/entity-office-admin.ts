import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityOpeningTimeAdminPage } from '../entity-opening-time-admin/entity-opening-time-admin';


@Component({
  selector: 'page-entity-office-admin',
  templateUrl: 'entity-office-admin.html'
})
export class EntityOfficeAdminPage {
    entityName;
    entityLocation = "";
    entityRoom = "";
    notAdded1: boolean;
    notAdded2: boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.entityName = navParams.get("entityName");

    }


  goToEntityOpeningTime() {
      if (this.entityLocation.length != 0 && this.entityRoom.length != 0) {
          this.navCtrl.push(EntityOpeningTimeAdminPage, { entityName: this.entityName, entityLocation: this.entityLocation, entityRoom: this.entityRoom });
      }
      if (this.entityLocation.length == 0) {
          this.notAdded1 = true;
      }
      else this.notAdded1 = false;
      if (this.entityRoom.length == 0) {
          this.notAdded2 = true;
      }
      else this.notAdded2 = false;
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityOffice } from '../../../../app/models/entityOffice';
/*
  Generated class for the EntityOpeningTimeAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-entity-opening-time-admin',
  templateUrl: 'entity-opening-time-admin.html'
})
export class EntityOpeningTimeAdminPage {
    entityName;
    entityLocation;
    entityRoom;
    entityDays = "";
    entityHoursFrom = "";
    entityHoursTo = "";
    entityHours;
    notAdded1: boolean;
    notAdded2: boolean;
    notAdded3: boolean;

    officeInfo;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.entityName = navParams.get("entityName");
        this.entityLocation = navParams.get("entityLocation");
        this.entityRoom = navParams.get("entityRoom");
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityOpeningTimeAdminPage');
  }

  addEntity() {
      this.entityHours = this.entityHoursFrom + " - " + this.entityHoursTo;
      this.officeInfo = new EntityOffice(this.entityLocation, this.entityRoom, this.entityDays, this.entityHours);
      if (this.entityDays.length != 0 && this.entityHoursTo.length != 0 && this.entityHours.length != 0) {
          this.db.addEntity(this.entityName, this.officeInfo);
          this.navCtrl.remove(2, 3);
      }
      if (this.entityDays.length == 0) {
          this.notAdded1 = true;
      }
      else this.notAdded1 = false;
      if (this.entityHoursFrom.length == 0) {
          this.notAdded2 = true;
      }
      else this.notAdded2 = false;
      if (this.entityHoursTo.length == 0) {
          this.notAdded3 = true;
      }
      else this.notAdded3 = false;
     
  }


}

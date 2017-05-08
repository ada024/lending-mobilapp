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
    entityDays;
    entityHoursFrom;
    entityHoursTo;
    entityHours;

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
      console.log("entityoffice: " + this.entityLocation + " entityroom: " + this.entityRoom + " entitydays: " + this.entityDays[0] + " entityhoursfrom: " + this.entityHoursFrom + " entityhoursto: " + this.entityHoursTo + " entityHoursTot: " + this.entityHours);
      this.db.addEntity(this.entityName, this.officeInfo);
      this.navCtrl.remove(2, 3);
      
  }


}

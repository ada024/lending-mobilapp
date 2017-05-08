import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntityOpeningTimeAdminPage } from '../entity-opening-time-admin/entity-opening-time-admin';

/*
  Generated class for the EntityOfficeAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.entityName = navParams.get("entityName");

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityOfficeAdminPage');
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

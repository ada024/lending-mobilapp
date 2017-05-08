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
    entityLocation;
    entityRoom;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.entityName = navParams.get("entityName");

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityOfficeAdminPage');
  }

  goToEntityOpeningTime() {
      this.navCtrl.push(EntityOpeningTimeAdminPage, { entityName: this.entityName, entityLocation: this.entityLocation, entityRoom: this.entityRoom });

  }

}

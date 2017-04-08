import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntityAddAdminPage } from '../entity-add-admin/entity-add-admin';
import { EntityListAdminPage } from '../entity-list-admin/entity-list-admin';
import { EntityDetailsAdminPage } from '../entity-details-admin/entity-details-admin';

@Component({
  selector: 'page-entity-admin',
  templateUrl: 'entity-admin.html'
})
export class EntityAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToEntityDetailsAdminPage() {
    this.navCtrl.push(EntityDetailsAdminPage);
  }

  goToEntityListAdminPage() {
    this.navCtrl.push(EntityListAdminPage);
  }

  goToEntityAddAdminPage() {
    this.navCtrl.push(EntityAddAdminPage);
  }
}

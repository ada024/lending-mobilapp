﻿import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutItemsPage } from '../checkout-items/checkout-items';
import { ItemsAdminPage } from '../items-admin/items-admin';
import { EntityAdminPage } from '../entity-admin/entity-admin';
import { DeveloperToolsPage } from '../developer-tools/developer-tools';

@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html'
})
export class HomeAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToCheckOut() {
    this.navCtrl.push(CheckoutItemsPage);
  }

  goToItemsAdminPage() {
    this.navCtrl.push(ItemsAdminPage);
  }

  goToEntityAdminPage() {
    this.navCtrl.push(EntityAdminPage);
  }

  goToDeveloperToolsAdminPage() {
    this.navCtrl.push(DeveloperToolsPage);
  }
}

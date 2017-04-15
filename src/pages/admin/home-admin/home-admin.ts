import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { CheckoutItemsPage } from '../checkout/checkout-items/checkout-items';
import { ItemsAdminPage } from '../items/items-admin/items-admin';
import { EntityAdminPage } from '../entities/entity-admin/entity-admin';
import { DeveloperToolsPage } from '../developer-tools/developer-tools';

@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html'
})
export class HomeAdminPage {
  currentUser = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.currentUser = this.db.currentUserName;
  }

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

  openDropdownMenu(event) {
    this.db.openDropdownMenu(event);
  }
}

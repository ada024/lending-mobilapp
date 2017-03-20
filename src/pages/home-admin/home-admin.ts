import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAdminPage } from '../items-admin/items-admin';
import { CheckoutFirstPage } from '../checkout-first/checkout-first';

@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html'
})
export class HomeAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToItemsAdminPage() {
    this.navCtrl.push(ItemsAdminPage);
  }
  goToCheckOut() {
    this.navCtrl.push(CheckoutFirstPage);
  }

}

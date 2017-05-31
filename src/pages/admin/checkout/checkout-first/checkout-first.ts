import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckoutItemsPage } from '../checkout-items/checkout-items'
import { CheckoutScanItemPage } from '../checkout-scan-item/checkout-scan-item'


@Component({
  selector: 'page-checkout-first',
  templateUrl: 'checkout-first.html'
})
export class CheckoutFirstPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {}

  goToCheckoutScanItemPage() {
      this.navCtrl.push(CheckoutScanItemPage);
  }

  goToCheckoutItemsPage() {
      this.navCtrl.push(CheckoutItemsPage);
  }
}

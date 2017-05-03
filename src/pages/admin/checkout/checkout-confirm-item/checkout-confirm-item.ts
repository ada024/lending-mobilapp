import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckoutScanItemPage } from '../checkout-scan-item/checkout-scan-item';
import { CheckoutItemsPage } from '../checkout-items/checkout-items';
import { CheckoutItemPickedPage } from '../checkout-item-picked/checkout-item-picked';


/*
  Generated class for the CheckoutConfirmItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-confirm-item',
  templateUrl: 'checkout-confirm-item.html'
})
export class CheckoutConfirmItemPage {
    item;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
        this.item = navParams.get("item");

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutConfirmItemPage');
  }
  goToCheckoutScanItemPage() {
      this.navCtrl.push(CheckoutScanItemPage);
  }

  goToCheckoutItemsPage() {
      this.navCtrl.push(CheckoutItemsPage);
  }

  goToCheckoutItemPickedPage() {
      this.navCtrl.push(CheckoutItemPickedPage);
  }

 
  }


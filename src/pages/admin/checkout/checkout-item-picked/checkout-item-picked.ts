import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckoutUserPage } from '../checkout-user/checkout-user';
import { CheckoutScanUserPage } from '../checkout-scan-user/checkout-scan-user';

/*
  Generated class for the CheckoutItemPicked page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-item-picked',
  templateUrl: 'checkout-item-picked.html',
})
export class CheckoutItemPickedPage {
	itemList:any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
        this.itemList = db.getTemporaryItems();
	  
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemPickedPage');
  }
  
 
  goToCheckoutUserPage() {
      this.navCtrl.push(CheckoutUserPage);
  }

  goToCheckoutScanUserPage() {
      this.navCtrl.push(CheckoutScanUserPage);
  }

  
  removeItem(item) {
      this.db.removeTemporaryItem(item);
  }
}

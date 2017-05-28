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
    itemList: any;
    tempItems: any;
    allreadyAdded: boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
        this.allreadyAdded = false;
        this.item = navParams.get("item");
          if(this.item.reserved!=null){
              this.item.reserved.sort((date1,date2) => {
      if(date1.pickupDate< date2.pickupDate){
        return -1;
      }
      return 1;
    });
          }

        var index = navParams.get("index");
        navCtrl.remove(index);


        if (this.db.checkIfItemIsAdded(this.item)) {
            this.allreadyAdded = true;
        }
        else {
            this.db.addTemporaryItems(this.item, this.item.$key);
        }

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

  goHome() {
      this.db.removeTemporaryItems();
      this.navCtrl.remove(2, 1);
      this.navCtrl.pop();
  }
 
  }


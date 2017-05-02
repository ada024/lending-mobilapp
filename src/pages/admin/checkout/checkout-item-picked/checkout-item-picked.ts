import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckoutUserPage } from '../checkout-user/checkout-user';
import { CheckoutItemsPage } from '../checkout-items/checkout-items';

/*
  Generated class for the CheckoutItemPicked page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-item-picked',
  templateUrl: 'checkout-item-picked.html',
  providers: [DatabaseService],
})
export class CheckoutItemPickedPage {
	itemList;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
	 db.loadTemporaryItems(this.onTemporaryItemsLoaded.bind(this));
	  
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemPickedPage');
  }
  
  goToCheckoutItemsPage() {
      var self = this.navParams.get("self");
      self.close = false;
      this.navCtrl.pop();
  }
 
  goToCheckoutUserPage() {
      this.navCtrl.push(CheckoutUserPage);
  }

  goHome() {
      this.db.removeTemporaryItems();
      this.navCtrl.remove(2, 3);
      this.navCtrl.pop();
  }
  removeItem(item) {
              this.db.removeTemporaryItem(item);
          }
		  
		  
  onTemporaryItemsLoaded(loadedList) {
    this.zone.run(() => {
      this.itemList = loadedList;
    });
  }


}

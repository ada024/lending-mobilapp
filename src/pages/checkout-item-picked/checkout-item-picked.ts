import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseService } from '../../providers/database-service';
import { CheckoutUserPage } from '../checkout-user/checkout-user';
import { CheckoutItemsPage } from  '../checkout-items/checkout-items';

/*
  Generated class for the CheckoutItemPicked page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-item-picked',
  templateUrl: 'checkout-item-picked.html',
  providers: [DatabaseService]
})
export class CheckoutItemPickedPage {
	itemList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
	  this.itemList = this.db.getTemporaryItems();
	  
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemPickedPage');
  }
  
  goToCheckoutItemsPage() {
      this.navCtrl.push(CheckoutItemsPage);
  }
  goToCheckoutUserPage() {
      this.navCtrl.push(CheckoutUserPage);
  }


  removeItem(item) {
              this.db.removeTemporaryItem(item);
          }


}

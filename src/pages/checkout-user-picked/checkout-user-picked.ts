import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { ConfirmCheckoutPage } from '../confirm-checkout/confirm-checkout';

/*
  Generated class for the CheckoutUserPicked page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-user-picked',
  templateUrl: 'checkout-user-picked.html',
  providers: [DatabaseService]
})
export class CheckoutUserPickedPage {
	item: any;
	user: any;
	itemList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
	  this.itemList = this.db.getPendingLoans();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutUserPickedPage');
  }

  goToConfirmCheckoutPage(){
	  this.navCtrl.push(ConfirmCheckoutPage);
  }
}

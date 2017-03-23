import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutItemsPage } from '../checkout-items/checkout-items';
import { CheckoutUserPage } from '../checkout-user/checkout-user';

/*
  Generated class for the CheckoutFirst page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-first',
  templateUrl: 'checkout-first.html'
})
export class CheckoutFirstPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutFirstPage');
  }

  goToCheckoutItemsPage() {
      this.navCtrl.push(CheckoutItemsPage);
  }
   goToCheckoutUsersPage() {
      this.navCtrl.push(CheckoutUserPage);
  }

}

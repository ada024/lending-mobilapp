import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseService } from '../../providers/database-service';
import { CheckoutUserPage } from '../checkout-user/checkout-user';

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
	item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
	  console.log("id itempicked =" + this.navParams.get('itemId'));
	  this.item = this.db.getItemById(this.navParams.get('itemId'));
	  console.log("id funnet er" + this.item.id);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemPickedPage');
  }
  
  goToCheckoutUserPage() {
      this.navCtrl.push(CheckoutUserPage, {itemId: this.item.id});
  }

}

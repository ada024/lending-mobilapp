import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
	  this.item = this.db.getItemById(this.navParams.get('itemId'));
	  this.user = this.db.getUserByName(this.navParams.get('userName'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutUserPickedPage');
  }

}

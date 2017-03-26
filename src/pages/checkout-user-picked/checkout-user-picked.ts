import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { ConfirmCheckoutPage } from '../confirm-checkout/confirm-checkout';
import firebase from 'firebase';

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

    itemListShow
    itemList: any;
    itemRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
      this.user = navParams.get('user');
      //this.itemListShow = this.db.getPendingItems();

      this.itemRef = firebase.database().ref('/items');
      this.itemRef.on('value', itemList => {
          let itemsFire = [];
          itemList.forEach(item => {
              itemsFire.push(item.val());
          });

          this.itemList = itemsFire;


      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutUserPickedPage');
  }

  goToConfirmCheckoutPage() {
     
      for (let item of this.itemList) {
          console.log("itemname" + item.name + "username" + this.user.name);
          this.db.addPendingLoan(item, this.user);
      }
     
	  this.navCtrl.push(ConfirmCheckoutPage);
  }
}

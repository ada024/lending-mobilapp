import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

/*
  Generated class for the CheckoutAwaitingConfirmation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-awaiting-confirmation',
  templateUrl: 'checkout-awaiting-confirmation.html'
})
export class CheckoutAwaitingConfirmationPage {
    user: any;
    items: any;
    itemsLength: any;

    confirmCheck: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.user = navParams.get("user");
        db.loadTemporaryItems(this.onTempLoaded.bind(this));
        db.checkIfConfirmed(this.onCheckConfLoaded.bind(this));
        this.itemsLength = this.items.length;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutAwaitingConfirmationPage');
  }

  onTempLoaded(tempItems) {
      this.items = tempItems;
  }

  onCheckConfLoaded(checkItems){
      this.confirmCheck = checkItems;
  }

  done() {
      this.db.removeTemporaryItems(this.items);
      this.navCtrl.remove(2, 8);
      this.navCtrl.pop();
  }

    
}

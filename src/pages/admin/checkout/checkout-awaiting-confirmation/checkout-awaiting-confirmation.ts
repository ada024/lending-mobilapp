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

    confirmCheck: any;

    usersLoansLength: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.user = navParams.get("user");
        this.items = db.getTemporaryItems();

        db.checkIfConfirmed(this.items, this.onCheckConfLoaded.bind(this));
 
        
        
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutAwaitingConfirmationPage');
  }


  onCheckConfLoaded(checkItems){
      this.confirmCheck = checkItems;
  }



  done() {
      this.db.removeTemporaryItems();
          this.navCtrl.remove(2, 7);
      
      
      this.navCtrl.pop();
  }

    
}

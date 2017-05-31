import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-checkout-awaiting-confirmation',
  templateUrl: 'checkout-awaiting-confirmation.html'
})
export class CheckoutAwaitingConfirmationPage {
    user: any;
    items: any;
    confirmCheck: any;
    formattedDate: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.user = navParams.get("user");
        this.formattedDate = navParams.get("formattedDate");
        this.items = db.getTemporaryItems();
        
        db.checkIfConfirmed(this.items, this.onCheckConfLoaded.bind(this));

    }



  onCheckConfLoaded(checkItems){
      this.confirmCheck = checkItems;
  }



  done() {
      this.db.removeTemporaryItems();
      this.navCtrl.popToRoot();
  }

    
}

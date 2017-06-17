import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-checkout-awaiting-confirmation',
  templateUrl: 'checkout-awaiting-confirmation.html'
})
export class CheckoutAwaitingConfirmationPage {
    user: any;
    itemList: any;
    confirmCheck: any;
    formattedDate: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        console.log("awaiting-confirmation");
        this.user = navParams.get("user");
        this.formattedDate = navParams.get("formattedDate");
        this.itemList = db.getTemporaryItems();
        console.log("itemlist: " + this.itemList.length);
        
        db.checkIfConfirmed(this.itemList, this.onCheckConfLoaded.bind(this));
        console.log("awaiting-confirmation2");

    }



  onCheckConfLoaded(checkItems){
      this.confirmCheck = checkItems;
  }



  done() {
      this.db.removeTemporaryItems();
      this.navCtrl.popToRoot();
  }

    
}
import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { ViewController, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { CheckoutConfirmItemPage } from '../checkout-confirm-item/checkout-confirm-item';


@Component({
  selector: 'page-checkout-items',
  templateUrl: 'checkout-items.html'
})
export class CheckoutItemsPage {
	itemsList: any;
	loadedItemList: any;
    searchItemString = '';
    tempItems: any;

    close: boolean;
    dataReceived: boolean;
	item: any;

    reservations: any;



    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public af: AngularFire, public db: DatabaseService, public zone: NgZone, private alertCtrl: AlertController) {

        db.loadItems(this.onDataLoaded.bind(this));


        this.itemsList.sort((loan1, loan2): number => {
            if (loan1.loan != null && loan2.loan == null) return 1;
            if (loan1.loan == null && loan2.loan != null) return -1;
            return 0;
        });
    }


  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.itemsList = this.loadedItemList = loadedList;
         this.itemsList.sort((date1,date2) => {
      if(date1.reserved!=null && date2.reserved==null){
        return -1;
      }
      if(date1.reserved!=null && date2.reserved!=null && date1.reserved[0].pickupDate<date2.reserved[0].pickupDate){
        return -1;
      }
      return 1;
    });

    for(var item of this.itemsList){
          if(item.reserved!=null){
              item.reserved.sort((date1,date2) => {
      if(date1.pickupDate< date2.pickupDate){
        return -1;
      }
      return 1;
    });
          }
      }
      });


  }

  searchItems() {
          this.itemsList = this.db.search(this.loadedItemList, this.searchItemString, "v.name");

  }

  goToCheckoutItemPickedPage(item) {
      if (item.loan == null) {
          this.close = true;
          const index = this.viewCtrl.index;
          this.navCtrl.push(CheckoutConfirmItemPage, { index: index, item: item });
      }
	}


    goHome() {
        //this.db.removeTemporaryItems();
        this.close = true;
        this.navCtrl.pop();
    }


}





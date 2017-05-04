import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { ViewController, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import { CheckoutConfirmItemPage } from '../checkout-confirm-item/checkout-confirm-item';
import { CustomAlertPage } from '../custom-alert/custom-alert';
import { Tempitems } from '../../../../app/models/tempItems';


/*
  Generated class for the CheckoutItems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

	

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone, private alertCtrl: AlertController, public modalCtrl: ModalController) {

        db.loadItems(this.onDataLoaded.bind(this));

        this.itemsList.sort((loan1, loan2): number => {
            if (loan1.loan != null && loan2.loan == null) return 1;
            if (loan1.loan == null && loan2.loan != null) return -1;
            return 0;
        });
    }
    ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemsPage');
    }
  

  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.itemsList = this.loadedItemList = loadedList;
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





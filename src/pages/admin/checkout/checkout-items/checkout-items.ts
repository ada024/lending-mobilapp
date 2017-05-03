import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import { CheckoutConfirmItemPage } from '../checkout-confirm-item/checkout-confirm-item';
import { CustomAlertPage } from '../custom-alert/custom-alert';


/*
  Generated class for the CheckoutItems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-items',
  templateUrl: 'checkout-items.html',
  providers: [DatabaseService]
})
export class CheckoutItemsPage {
	itemsList: any;
	loadedItemList: any;
    searchItemString = '';
    

    close: boolean;
    dataReceived: boolean;
	item: any;

	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone, private alertCtrl: AlertController, public modalCtrl: ModalController) {

        db.loadItems(this.onDataLoaded.bind(this));
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
		if(this.db.checkIfItemIsAdded(item)){
		this.alreadyAddedAlert();
		}
		else{
        this.db.addTemporaryItems(item, item.$key);
		this.close = true;
        this.navCtrl.push(CheckoutConfirmItemPage, { self: this, item: item })
		}		
	}


    goHome() {
        //this.db.removeTemporaryItems();
        this.close = true;
        this.navCtrl.pop();
    }
	
	
	alreadyAddedAlert() {
  let alert = this.alertCtrl.create({
    title: 'Already added',
    subTitle: 'This item is already added',
    buttons: ['Dismiss']
  });
  alert.present();
}

}





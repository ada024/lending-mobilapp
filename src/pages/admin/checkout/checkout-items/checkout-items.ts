import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import { CheckoutItemPickedPage } from '../checkout-item-picked/checkout-item-picked';
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
    showList: boolean;
	item: any;

	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone, private alertCtrl: AlertController, public modalCtrl: ModalController) {
        this.showList = false;
        db.loadItems(this.onDataLoaded.bind(this));
       

        if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
		}

    ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemsPage');
    }
  
   
    onTagFound(nfcEvent) {
		var item;
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                item = this.db.getItemByTag(tagId);
				if(item!=null){
			   this.isThisTheRightItem(item);
				}
            });
			if(item!=null){
            this.close = true;
		}
        }
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
        this.navCtrl.push(CheckoutItemPickedPage, { self: this })
		}		
	}


    goHome() {
        this.db.removeTemporaryItems();
        this.close = true;
        this.navCtrl.pop();
    }
	
	isThisTheRightItem(item){
		this.item = item;
	let customAlert = this.modalCtrl.create(CustomAlertPage, {item: item});
	 customAlert.onDidDismiss(data => {
		 if(data!=null){
			 if(this.db.checkIfItemIsAdded(data)){
				 this.alreadyAddedAlert();
				 this.close = false;
			 }
			 else{
     this.goToCheckoutItemPickedPage(data);
			 }
		 }
		 else{
			 this.close = false;
		 }
   });
	customAlert.present();
	}
	
	
	
	
	alreadyAddedAlert() {
  let alert = this.alertCtrl.create({
    title: 'Already added',
    subTitle: 'This item is already added',
    buttons: ['Dismiss']
  });
  alert.present();
}

	hideList(){
		this.showList = false;
	}
	
	appearList(){
		this.showList = true;
	}
}





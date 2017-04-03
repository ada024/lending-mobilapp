import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';
import { CheckoutItemPickedPage } from '../checkout-item-picked/checkout-item-picked';

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
	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone) {
		
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

goToCheckoutItemPickedPage(item){
	this.db.addTemporaryItems(item);
	this.navCtrl.push(CheckoutItemPickedPage)
	
}
    
}



import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';
import { CheckoutItemPickedPage } from '../checkout-item-picked/checkout-item-picked';
import { TagUtil, Tag } from '../../classes/tag';

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
    showList: boolean;

    tag: Tag;
    close = false;
    dataReceived: boolean;

	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone) {
        this.showList = false;
        db.loadItems(this.onDataLoaded.bind(this));

        this.tag = new Tag();

        if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener((tagEvent: Event) => this.tagListenerSuccess(tagEvent));
            (<any>window).nfc.addTagDiscoveredListener((tagEvent: Event) => this.tagListenerSuccess(tagEvent));
        }
		}

    ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemsPage');
    }
  
    tagListenerSuccess(tagEvent: Event) {
        console.log(tagEvent);
        if (!this.close) {
            this.zone.run(() => {
                this.tag = TagUtil.readTagFromJson(tagEvent);
                var tagId = (<any>window).nfc.bytesToHexString(this.tag.id);
                this.dataReceived = true;
                var item = this.db.getItemByTag(tagId);
                this.db.addTemporaryItems(item);
                this.navCtrl.push(CheckoutItemPickedPage);
            });
            this.close = true;
        }
    }

  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.itemsList = this.loadedItemList = loadedList;
      });
  }

  searchItems() {
      this.showList = true;
      this.itemsList = this.db.search(this.loadedItemList, this.searchItemString, "v.name");
  }

goToCheckoutItemPickedPage(item){
	this.db.addTemporaryItems(item);
	this.navCtrl.push(CheckoutItemPickedPage)
	
}
    
}



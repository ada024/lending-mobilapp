import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
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
    

    tag: Tag;
    close = false;
    dataReceived: boolean;
    toggleText = "Show item list";
    showList: boolean;
    showTagInfo: boolean;

	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone) {
        this.showList = false;
        this.showTagInfo = true;
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
      if (this.searchItemString != " ") {
          this.showList = true;
          this.showTagInfo = false;
          this.toggleText = "Show tag info"
      }
          this.itemsList = this.db.search(this.loadedItemList, this.searchItemString, "v.name");
   
  }

goToCheckoutItemPickedPage(item){
	this.db.addTemporaryItems(item);
	this.navCtrl.push(CheckoutItemPickedPage)
	
}


    toggleView() {
        if (this.toggleText == "Show item list") {
            this.toggleText = "Show tag info";
            this.showList = true;
            this.showTagInfo = false
        }
        else if (this.toggleText == "Show tag info") {
            this.toggleText = "Show item list";
            this.showList = false;
            this.showTagInfo = true;
        }

    }
    
}



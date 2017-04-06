import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
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
    

    close: boolean;
    dataReceived: boolean;
    toggleText = "Show item list";
    showList: boolean;
    showTagInfo: boolean;

	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone, private alertCtrl: AlertController) {
        this.showList = false;
        this.showTagInfo = true;
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
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                var item = this.db.getItemByTag(tagId);
                this.confirmItem(item);
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

    goToCheckoutItemPickedPage(item) {
        this.db.addTemporaryItems(item);
        this.navCtrl.push(CheckoutItemPickedPage, { self: this })
	}


    toggleView() {
        if (this.toggleText == "Show item list") {
            this.toggleText = "Show tag info";
            this.showList = true;
            this.showTagInfo = false
            this.searchItemString = "";
        }
        else if (this.toggleText == "Show tag info") {
            this.toggleText = "Show item list";
            this.showList = false;
            this.showTagInfo = true;
        }

    }

    confirmItem(item) {
        let alert = this.alertCtrl.create({
            title: 'Is this the item you ment to scan?',
            message: 'Item scanned: ' + item.name,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        this.close = false;
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.goToCheckoutItemPickedPage(item);
                    }
                }
            ]
        });
        alert.present();
    }

    goHome() {
        this.db.removeTemporaryItems();
        this.close = true;
        this.navCtrl.pop();
    }
    
}



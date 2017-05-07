import { Component, NgZone  } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsDetailsAdminPage } from '../items-details-admin/items-details-admin';

/*
  Generated class for the ItemsLoanedAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-items-loaned-admin',
  templateUrl: 'items-loaned-admin.html',
  providers: [DatabaseService]
})
export class ItemsLoanedAdminPage {
    itemsList: any;
    loadedItemList: any;
    searchString = '';


    constructor(public navCtrl: NavController, public navParams: NavParams,
        public zone: NgZone, public db: DatabaseService, public appCtrl:App) {
        db.loadLoanedItems(this.onDataLoaded.bind(this));
    }

ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsLoanedAdminPage');
  }
    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.itemsList = this.loadedItemList = loadedList;
        });
    }
  
    goToItemsDetailsAdminPage(item) {
        this.appCtrl.getRootNav().push(ItemsDetailsAdminPage, { item: item });

    }
}

import { Component, NgZone  } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsDetailsAdminPage } from '../items-details-admin/items-details-admin';


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
  
    goToItemsDetailsAdminPage(item) {
        this.appCtrl.getRootNav().push(ItemsDetailsAdminPage, { item: item });

    }
}

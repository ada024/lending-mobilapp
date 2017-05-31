import { Component, NgZone } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsDetailsUserPage } from '../items-details-user/items-details-user';


@Component({
  selector: 'page-items-unavailable-user',
  templateUrl: 'items-unavailable-user.html'
})
export class ItemsUnavailableUserPage {
    unavailableItems;
    loadedItemList: any;
    searchString = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService,
        public zone: NgZone, public appCtrl: App) {
        db.loadUnavailableItems(this.onDataLoaded.bind(this));
    }


    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.unavailableItems = this.loadedItemList = loadedList;
            this.unavailableItems.sort((date1, date2)=>date1.loan.timeInMillis-date2.loan.timeInMillis);
      
    for(var item of this.unavailableItems){
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
  

    search() {
        this.unavailableItems = this.db.search(this.loadedItemList, this.searchString, "v.name");
    }

    goToItemPickedUserPage(item) {
        this.appCtrl.getRootNav().push(ItemsDetailsUserPage, { item: item });
    }

}

import { Component, NgZone } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsDetailsUserPage } from '../items-details-user/items-details-user';

/*
  Generated class for the ItemsUnavailableUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad ItemsUnavailableUserPage');
    }

    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.unavailableItems = this.loadedItemList = loadedList;
            this.unavailableItems.sort((date1, date2): number => {
                if (date1.loan != null && date2.loan == null && date1.loan.timeInMillis < date2.reserved.returnDate) return -1;
                if (date1.loan != null && date2.loan != null && date1.loan.timeInMillis < date2.loan.timeInMillis) return -1;
                if (date1.loan == null && date2.loan == null && date1.reserved.returnDate < date2.reserved.returnDate) return -1;
                if (date1.loan == null && date2.loan != null && date1.reserved.returnDate < date2.loan.timeInMillis) return -1;
                return 1;
            });
        });
    }
  

    search() {
        this.unavailableItems = this.db.search(this.loadedItemList, this.searchString, "v.name");
    }

    goToItemPickedUserPage(item) {
        this.appCtrl.getRootNav().push(ItemsDetailsUserPage, { item: item });
    }

}

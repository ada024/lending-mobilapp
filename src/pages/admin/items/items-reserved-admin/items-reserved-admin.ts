import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsDetailsAdminPage } from '../items-details-admin/items-details-admin';

/*
  Generated class for the ItemsReservedAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-items-reserved-admin',
  templateUrl: 'items-reserved-admin.html',
  providers: [DatabaseService]
})
export class ItemsReservedAdminPage {
    itemsList: any;
    loadedItemList: any;
    searchString = '';
    formattedDate;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public zone: NgZone, public db: DatabaseService) {
        db.loadReservedItems(this.onDataLoaded.bind(this));
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsReservedAdminPage');
  }

  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.itemsList = this.loadedItemList = loadedList;
          console.log("reserved length: " + this.itemsList.length);
      });
  }

  search() {
      this.itemsList = this.db.search(this.loadedItemList, this.searchString, "v.name");
  }


  goToItemsDetailsAdminPage(item) {
      this.navCtrl.push(ItemsDetailsAdminPage, { item: item });

  }


}

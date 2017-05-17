import { Component, NgZone  } from '@angular/core';
import {  App, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsDetailsUserPage } from '../items-details-user/items-details-user';


/*
  Generated class for the ItemListUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-list-user',
  templateUrl: 'item-list-user.html'
})
export class ItemListUserPage {
  itemsList: any;
  loadedItemList: any;
  searchString = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public zone: NgZone, public db: DatabaseService, public appCtrl: App) {
      db.loadAvailableItems(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.itemsList = this.loadedItemList = loadedList;
          this.itemsList.sort((date1,date2) => {
      if(date1.reserved!=null && date2.reserved==null){
        console.log("HEY");
        return -1;
      }
      if(date1.reserved!=null && date2.reserved!=null && date1.reserved[0].pickupDate<date2.reserved[0].pickupDate){
        console.log("HEEEEY");
        return -1;
      }
      return 1;
    });
      });
  }

  search() {
      this.itemsList = this.db.search(this.loadedItemList, this.searchString, "v.name");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListUserPage');
  }

  goToItemPickedUserPage(item) {
      this.appCtrl.getRootNav().push(ItemsDetailsUserPage, { item: item });
  }

}

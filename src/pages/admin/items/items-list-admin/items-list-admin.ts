import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsDetailsAdminPage } from '../items-details-admin/items-details-admin';

@Component({
  selector: 'page-items-list-admin',
  templateUrl: 'items-list-admin.html',
  providers: [DatabaseService]
})
export class ItemsListAdminPage {
	itemsList: any;
	loadedItemList: any;
	searchString = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    db.loadItems(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
    this.zone.run(() => {
      this.itemsList = this.loadedItemList = loadedList;
    });
  }

  search(){
    this.itemsList = this.db.search(this.loadedItemList, this.searchString, "v.name");
  }

  goToItemsDetailsAdminPage(item) {
    this.navCtrl.push(ItemsDetailsAdminPage, {item: item});

  }

  removeItem(item) {
      var deleteItem = this.db.getItem(item.name, item.id);
      this.db.removeItem(deleteItem);
  }


}

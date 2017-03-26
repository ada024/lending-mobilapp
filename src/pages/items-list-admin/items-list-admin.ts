import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

@Component({
  selector: 'page-items-list-admin',
  templateUrl: 'items-list-admin.html',
  providers: [DatabaseService]
})
export class ItemsListAdminPage {
	itemsList: any;
	loadedItemList: any;
	searchItemString = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    db.loadItems(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
    this.zone.run(() => {
      this.itemsList = this.loadedItemList = loadedList;
    });
  }

  searchItems(){
    this.itemsList = this.db.search(this.loadedItemList, this.searchItemString, "v.name");
  }


}

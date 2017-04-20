import { Component, NgZone  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

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
      public zone: NgZone, public db: DatabaseService) {
      db.loadItems(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.itemsList = this.loadedItemList = loadedList;
      });
  }

  search() {
      this.itemsList = this.db.search(this.loadedItemList, this.searchString, "v.name");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListUserPage');
  }

}

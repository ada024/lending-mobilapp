import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DatabaseService } from '../../../../providers/database-service';

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
        public zone: NgZone) {
        db.loadUnavailableItems(this.onDataLoaded.bind(this));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ItemsUnavailableUserPage');
    }

    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.unavailableItems = this.loadedItemList = loadedList;
        });
    }
  

    search() {
        this.unavailableItems = this.db.search(this.loadedItemList, this.searchString, "v.name");
  }

}

import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Tabs} from 'ionic-angular';
import { ItemListUserPage } from '../item-list-user/item-list-user';
import { ItemsUnavailableUserPage } from '../items-unavailable-user/items-unavailable-user';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-items-tabs-user',
  templateUrl: 'items-tabs-user.html',
  providers: [DatabaseService]
})
export class ItemsTabsUserPage {
    AvailableItems = ItemListUserPage;
    UnavailableItems = ItemsUnavailableUserPage;
    @ViewChild('myTabs') tabRef: Tabs;
    selectedIndex;
    numberOfAvailable;
    numberOfUnavailable
    

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public zone: NgZone,public db: DatabaseService) {
        db.loadNumberOfAvailableItems(this.onNumberOfAvailableLoaded.bind(this));
        db.loadNumberOfUnavailableItems(this.onNumberOfUnavailableLoaded.bind(this));


    }

  onNumberOfAvailableLoaded(numberOfAvailable) {
      this.zone.run(() => {
          this.numberOfAvailable = numberOfAvailable;
      });
  }
  onNumberOfUnavailableLoaded(numberOfUnavailable) {
      this.zone.run(() => {
          this.numberOfUnavailable = numberOfUnavailable;
      });
  }





}

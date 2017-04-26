import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs} from 'ionic-angular';
import { ItemsListAdminPage } from '../items-list-admin/items-list-admin';
import { ItemsReservedAdminPage } from '../items-reserved-admin/items-reserved-admin';
import { ItemsLoanedAdminPage } from '../items-loaned-admin/items-loaned-admin';

/*
  Generated class for the ItemsTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-items-tabs',
  templateUrl: 'items-tabs.html'
})
export class ItemsTabsPage {
    AvailableItems = ItemsListAdminPage;
    ReservedItems = ItemsReservedAdminPage;
    LoanedItems = ItemsLoanedAdminPage;
    @ViewChild('myTabs') tabRef: Tabs;
    selectedIndex;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.selectedIndex = 0;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsTabsPage');
  }

  swipeEvent(e) {
      console.log("selectedIndex "+this.selectedIndex);
      if (e.direction == 4 && this.selectedIndex == 1) {
          this.selectedIndex = 0;
      this.tabRef.select(0);
      }

      else if (e.direction == 4 && this.selectedIndex == 2) {
          this.selectedIndex = 1;
          this.tabRef.select(1);
      }

      else if (e.direction == 2 && this.selectedIndex == 0) {
          this.selectedIndex = 1;
          this.tabRef.select(1);
      }

      else if (e.direction == 2 && this.selectedIndex == 1) {
          this.selectedIndex = 2;
          this.tabRef.select(2);
      }
       
  }

}

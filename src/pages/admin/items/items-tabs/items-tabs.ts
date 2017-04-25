import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    @ViewChild('myTabs') tabRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsTabsPage');
  }

  swipeEvent(e) {
      console.log("e :" + e + "tabref: " + this.tabRef);
      if (e == 2 && this.tabRef == 1) {
      this.tabRef.select(0);
      }

      else if (e == 2 && this.tabRef == 2) {
          this.tabRef.select(1);
      }

      else if (e == 4 && this.tabRef == 0) {
          this.tabRef.select(1);
      }

      else if (e == 4 && this.tabRef == 1) {
          this.tabRef.select(2);
      }
          
  }

}

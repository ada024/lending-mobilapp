import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Tabs} from 'ionic-angular';
import { ItemsListAdminPage } from '../items-list-admin/items-list-admin';
import { ItemsReservedAdminPage } from '../items-reserved-admin/items-reserved-admin';
import { ItemsLoanedAdminPage } from '../items-loaned-admin/items-loaned-admin';
import { DatabaseService } from '../../../../providers/database-service';


/*
  Generated class for the ItemsTabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-items-tabs',
  templateUrl: 'items-tabs.html',
  providers: [DatabaseService]
})
export class ItemsTabsPage {
    AvailableItems = ItemsListAdminPage;
    ReservedItems = ItemsReservedAdminPage;
    LoanedItems = ItemsLoanedAdminPage;
    @ViewChild('myTabs') tabRef: Tabs;
    selectedIndex;
    numberOfAvailable;
    numberOfReserved;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public zone: NgZone,public db: DatabaseService) {
        this.selectedIndex = 0;
        db.loadNumberOfAvailableItems(this.onNumberOfAvailableLoaded.bind(this));
        db.loadNumberOfReservedItems(this.onNumberOfReservedLoaded.bind(this));

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsTabsPage');
  }

  onNumberOfAvailableLoaded(numberOfAvailable) {
      this.zone.run(() => {
          this.numberOfAvailable = numberOfAvailable;
      });
  }
  onNumberOfReservedLoaded(numberOfReserved) {
      this.zone.run(() => {
          this.numberOfReserved = numberOfReserved;
      });
  }


}

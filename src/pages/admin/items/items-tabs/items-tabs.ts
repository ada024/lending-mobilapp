import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Tabs} from 'ionic-angular';
import { ItemsListAdminPage } from '../items-list-admin/items-list-admin';
import { ItemsReservedAdminPage } from '../items-reserved-admin/items-reserved-admin';
import { ItemsLoanedAdminPage } from '../items-loaned-admin/items-loaned-admin';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';


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
    LoanedItems = ItemsLoanedAdminPage;
    ReservedItems = ItemsReservedAdminPage;
    @ViewChild('myTabs') tabRef: Tabs;
    selectedIndex;
    numberOfAvailable;
    numberOfLoaned;
    numberOfReserved;

    constructor(public navCtrl: NavController, public navParams: NavParams, public menu: DropDownMenuService,
        public zone: NgZone,public db: DatabaseService) {
        this.selectedIndex = 0;
        db.loadNumberOfAvailableItems(this.onNumberOfAvailableLoaded.bind(this));
        db.loadNumberOfLoanedItems(this.onNumberOfLoanedLoaded.bind(this));
        db.loadNumberOfReservedItems(this.onReservedLoaded.bind(this));
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsTabsPage');
  }

onReservedLoaded(reserved){
    this.zone.run(() => {
    this.numberOfReserved = reserved;
    });
}

  onNumberOfAvailableLoaded(numberOfAvailable) {
      this.zone.run(() => {
          this.numberOfAvailable = numberOfAvailable;
      });
  }

  onNumberOfLoanedLoaded(numberOfLoaned) {
      this.zone.run(() => {
          this.numberOfLoaned = numberOfLoaned;
      });
  }


}

import { Component, NgZone  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { CheckinConfirmPage } from '../checkin-confirm/checkin-confirm';


@Component({
  selector: 'page-checkin-list',
  templateUrl: 'checkin-list.html'
})
export class CheckinListPage {
    loansList: any;
    loadedItemList: any;
    searchItemString = '';


    close: boolean;
    dataReceived: boolean;
    showList: boolean;
    loan: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, 
    public menu: DropDownMenuService, public zone: NgZone) {
        db.loadLoansForCheckin(this.onDataLoaded.bind(this));
    }


  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.loansList = this.loadedItemList = loadedList;
      });
  }

  goToCheckinConfirmPage(loan) {
      this.close = true;
      this.navCtrl.push(CheckinConfirmPage, { loan: loan, self: this });
  }	


  searchItems() {
      this.loansList = this.db.search(this.loadedItemList, this.searchItemString, "v.name");

  }

}

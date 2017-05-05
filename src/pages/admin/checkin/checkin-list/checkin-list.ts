import { Component, NgZone  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckinConfirmPage } from '../checkin-confirm/checkin-confirm';

/*
  Generated class for the CheckinList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
        db.loadLoansForCheckin(this.onDataLoaded.bind(this));
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinListPage');
  }

  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.loansList = this.loadedItemList = loadedList;
      });
  }

  goToCheckinConfirmPage(loan) {
      var user = this.db.getUsernameByUserId(loan.loan.loaner);
      this.close = true;
      this.navCtrl.push(CheckinConfirmPage, { loan: loan, user: user, self: this });
  }	


  searchItems() {
      this.loansList = this.db.search(this.loadedItemList, this.searchItemString, "v.name");

  }

}

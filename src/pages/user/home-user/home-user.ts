import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';

@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html',
  providers: [DatabaseService]
})
export class HomeUserPage {
  currentUser = "";
  pendingLoans;
  loans;
  //pendingLoans2 = [{itemName: "a"},{itemName: "b"}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.currentUser = this.db.currentUserName;
    this.pendingLoans = db.getPendingLoans();
    this.loans = db.getLoans();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUserPage');
  }

  acceptLoan(event, pendingLoan) {
    this.db.deletePendingLoan(pendingLoan);
    this.db.addLoan(pendingLoan.itemName);
  }
}

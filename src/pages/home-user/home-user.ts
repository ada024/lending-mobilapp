import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

/*
  Generated class for the HomeUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html',
  providers: [DatabaseService]
})
export class HomeUserPage {
  pendingLoans;
  loans;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public db: DatabaseService) {
    this.pendingLoans = db.getPendingLoans();
    this.loans = db.getLoans();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUserPage');
  }

  acceptLoan(pendingLoan) {
    this.db.addLoans(pendingLoan.itemName);
  }

}

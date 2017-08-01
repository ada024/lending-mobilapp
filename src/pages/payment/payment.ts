import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  processing = false;
  success = false;
  newMax = "1";

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    if(db.currentUser.numberOfMaxEntities) {
      this.newMax = (parseInt(db.currentUser.numberOfMaxEntities) + 1).toString()
    }
  }

  purchase() {
    this.db.purchase(success => {
      this.success = success;
    })
  }

  done() {
    this.navCtrl.pop();
  }

  free() {
    this.db.increaseNumberOfMaxEntities();
    this.success = true;
  }
}

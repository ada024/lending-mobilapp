import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { HomeAdminPage } from '../admin/home-admin/home-admin';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  purchaseAdminMode;
  success;
  newMax;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.purchaseAdminMode = navParams.get("purchaseAdminMode");
    this.success = false;
    this.newMax = (parseInt(db.currentUser.numberOfMaxEntities) + 1).toString()
  }

  purchase() {
    this.db.purchase().then(resolve => {
      this.db.setAdminRole("true")
    })
  }

  increaseNumberOfMaxEntities() {
    this.db.increaseNumberOfMaxEntities().then(resolve => {
      this.success = true;
    })
  }

  done() {
    this.navCtrl.pop();
  }

  reset() {
    this.db.purchase();
    this.navCtrl.pop();
  }
}

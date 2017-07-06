import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { HomeAdminPage } from '../admin/home-admin/home-admin';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  constructor(public navCtrl: NavController, public db: DatabaseService) {}

  purchase() {
    if (!(this.db.currentUser != null && this.db.currentUser.adminRole == "true")) {
      this.db.setAdminRole("true");
    }
    else {
      this.navCtrl.setRoot(HomeAdminPage);
    }
  }
}

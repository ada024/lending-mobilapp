import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { HomeAdminPage } from '../admin/home-admin/home-admin';
import { HomeUserPage } from '../user/home-user/home-user';
import { PaymentPage } from '../payment/payment';


@Component({
  selector: 'page-choose-account-type',
  templateUrl: 'choose-account-type.html'
})
export class ChooseAccountTypePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {}

  goToHomeAdminPage() {
    if (!(this.db.currentUser != null && this.db.currentUser.adminRole == "true")) {
      this.db.setAdminRole("true");
    }
    else {
      this.navCtrl.setRoot(HomeAdminPage);
    }
  }

  goToHomeUserPage() {
    if (!(this.db.currentUser != null && this.db.currentUser.adminRole == "false")) {
      this.db.setAdminRole("false");
    }
    else {
      this.navCtrl.setRoot(HomeUserPage);
    }
  }

  goToPaymentPage() {
    this.navCtrl.setRoot(PaymentPage,{purchaseAdminMode: true});
  }

}


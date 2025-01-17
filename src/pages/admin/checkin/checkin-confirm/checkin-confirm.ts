﻿import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { Toast } from 'ionic-native';
import { UsersDetailsAdminPage } from '../../users/users-details-admin/users-details-admin';

@Component({
  selector: 'page-checkin-confirm',
  templateUrl: 'checkin-confirm.html',
})
export class CheckinConfirmPage {
    loan: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private platform: Platform) {
        this.loan = navParams.get('loan');
        var index = navParams.get("index");
        navCtrl.remove(index);
    }


  goToHomeAdminPage() {
      this.db.removeLoan(this.loan);
      if (this.platform.is('cordova')) {
          this.showToast('Item checked in', 'bottom');
      }
      this.navCtrl.popToRoot();
  }

  showToast(message, position) {
      this.platform.ready().then(() => Toast.show(message, "long", position).subscribe(
          toast => {
              console.log(toast);
          }
      ));
  }


  goToUsersDetailsAdminPage(user) {
      this.db.getUserById(this.loan.loan.loaner).then((user) => {
          this.navCtrl.push(UsersDetailsAdminPage, {user: user});
      });
  }

}

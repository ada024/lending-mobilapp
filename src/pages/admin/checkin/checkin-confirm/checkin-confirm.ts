import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { Toast } from 'ionic-native';
import { UsersDetailsAdminPage } from '../../users/users-details-admin/users-details-admin';

@Component({
  selector: 'page-checkin-confirm',
  templateUrl: 'checkin-confirm.html',
})
export class CheckinConfirmPage {
    loan: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, 
    public menu: DropDownMenuService, private platform: Platform) {
        platform.registerBackButtonAction(this.goBack.bind(this));
        this.loan = navParams.get('loan');
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

  goBack() {
      this.navParams.get('self').close = false;
      this.navCtrl.pop();
  }

  goToUsersDetailsAdminPage(user) {
      this.db.getUserById(this.loan.loan.loaner).then((user) => {
          this.navCtrl.push(UsersDetailsAdminPage, {user: user});
      });
  }

}

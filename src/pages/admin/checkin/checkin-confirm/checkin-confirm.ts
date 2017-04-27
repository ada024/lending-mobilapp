import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { Toast } from 'ionic-native';



/*
  Generated class for the CheckinConfirm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin-confirm',
  templateUrl: 'checkin-confirm.html',
  providers: [DatabaseService]
})
export class CheckinConfirmPage {
    loan: any;
    user: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private platform: Platform) {
        this.loan = navParams.get('loan');
        this.user = navParams.get('user');
        
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinConfirmPage');
  }

  goToHomeAdminPage() {

      this.db.removeLoan(this.loan);
      if (this.platform.is('cordova')) {
          this.showToast('Item checked in', 'bottom');
      }

      this.navCtrl.remove(2, 3);
      this.navCtrl.pop();
  }

  showToast(message, position) {
      this.platform.ready().then(() => Toast.show(message, "long", position).subscribe(
          toast => {
              console.log(toast);
          }
      ));
  }

  goBack() {
      var self = this.navParams.get('self');
      self.close = false;
      this.navCtrl.pop();
  }

}

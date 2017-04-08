import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { HomeAdminPage } from '../admin/home-admin/home-admin';
import { HomeUserPage } from '../user/home-user/home-user';

@Component({
  selector: 'page-choose-account-type',
  templateUrl: 'choose-account-type.html'
})
export class ChooseAccountTypePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: DatabaseService) {}

  goToHomeAdminPage() {
    this.navCtrl.push(HomeAdminPage);
  }

  goToHomeUserPage() {
    this.navCtrl.push(HomeUserPage);
  }

  /* DONT DELETE YET
   isAlreadyLoggedIn() {
   if (this.auth.isLoggedIn()) {
   let toast = this.toastCtrl.create({
   message: 'isLoged in true , chooseAcc',
   duration: 3000
   });
   toast.present();
   } else {
   let toast = this.toastCtrl.create({
   message: 'isLoged in false, chooseAcc',
   duration: 3000
   });
   toast.present();
   }
   }
   */


  logout(): void {
    this.auth.logout();
  }

}


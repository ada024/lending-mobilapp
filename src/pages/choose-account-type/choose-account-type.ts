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
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {}

  goToHomeAdminPage() {
    this.navCtrl.push(HomeAdminPage);
  }

  goToHomeUserPage() {
    this.navCtrl.push(HomeUserPage);
  }

  logout(): void {
    this.db.logout();
  }

  customButton(): void {
    this.db.msgToast("Check console.log");
    this.db.listUsers();
  }



}


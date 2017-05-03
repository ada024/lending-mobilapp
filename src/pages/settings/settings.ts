import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HomeAdminPage } from '../admin/home-admin/home-admin';
import { HomeUserPage } from '../user/home-user/home-user';
import { ChooseAccountTypePage } from "../choose-account-type/choose-account-type";


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  db;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.db = navParams.get("db");
  }

  changeToBorrower() {
    this.navCtrl.setRoot(ChooseAccountTypePage);
  }

  changeToAdmin() {
    this.navCtrl.setRoot(ChooseAccountTypePage);
  }
}

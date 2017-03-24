import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeAdminPage } from '../home-admin/home-admin';
import { HomeUserPage } from '../home-user/home-user';

@Component({
  selector: 'page-choose-account-type',
  templateUrl: 'choose-account-type.html'
})
export class ChooseAccountTypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToHomeAdminPage() {
    this.navCtrl.push(HomeAdminPage);
  }

  goToHomeUserPage() {
    this.navCtrl.push(HomeUserPage);
  }
}

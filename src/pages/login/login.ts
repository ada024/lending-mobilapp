import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ChooseAccountTypePage } from '../choose-account-type/choose-account-type';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  login() {
    this.navCtrl.push(ChooseAccountTypePage);
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomeAdminPage } from '../home-admin/home-admin';
import { HomeUserPage } from '../home-user/home-user';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-choose-account-type',
  templateUrl: 'choose-account-type.html'
})
export class ChooseAccountTypePage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(!this.isAlreadyLoggedIn()){
      console.log('not login yet, redirect to login page');
      this.navCtrl.push(LoginPage);
    }
      


  }

  goToHomeAdminPage() {

    this.navCtrl.push(HomeAdminPage);
  }

  goToHomeUserPage() {
    this.navCtrl.push(HomeUserPage);
  }

  isAlreadyLoggedIn(){
    let user = window.localStorage.getItem('user');
    return user !== null &&  user !== undefined;
  }

}



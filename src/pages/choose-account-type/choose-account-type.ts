import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { HomeAdminPage } from '../admin/home-admin/home-admin';
import { HomeUserPage } from '../user/home-user/home-user';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-choose-account-type',
  templateUrl: 'choose-account-type.html'
})
export class ChooseAccountTypePage {
  currentUser = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.currentUser = this.db.currentUserName;
   /* if(!this.isAlreadyLoggedIn()){
      console.log('not login yet, redirect to login page');
      this.navCtrl.push(LoginPage);
    }
      */


  }

  goToHomeAdminPage() {

    this.navCtrl.push(HomeAdminPage);
  }

  goToHomeUserPage() {
    this.navCtrl.push(HomeUserPage);
  }

  /*
  isAlreadyLoggedIn(){
    //TODO Henter user til bruk av login
    let user = window.localStorage.getItem('user');
    return user !== null &&  user !== undefined;
  }
*/


}



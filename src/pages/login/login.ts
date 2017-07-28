import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

// email auth
//import {HomeUserPage} from '../pages/user/home-user/home-user';
import {EmailLoginPage} from "../email-login/email-login";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  userProfile: any = null;

  constructor(public navCtrl: NavController, public db: DatabaseService) {

  }

  loginWithFacebook(): void {
    this.db.loginWithFacebook().subscribe(() => {
      console.log("Login: success");
    }, err => {
      console.log(err);
    });
  }

  loginWithEmail() {
    this.navCtrl.push(EmailLoginPage);
  }

}

import {Component, ElementRef} from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

import { ChooseAccountTypePage } from '../choose-account-type/choose-account-type';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage{
  //root:any;
  userProfile: any = null;
  
  constructor(public navCtrl: NavController, private auth: DatabaseService ){}

  loginWithFacebook(): void{

    if(!this.auth.isLoggedIn()) {
      this.auth.loginWithFacebook().subscribe((success) => {
      console.log(success);
  //    this.userProfile = success;               // Brukes for å hente bilde og navn på login bruker til html
    }, err => {
      console.log(err);
    });
  }
  this.auth.setup();
  this.navCtrl.push(ChooseAccountTypePage);
  }

  logout(): void {
    this.auth.logout();
  }


}

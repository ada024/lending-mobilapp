import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

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
     let success = "success";
      console.log("Login: "+success);
    }, err => {
      console.log(err);
    });
  }
}

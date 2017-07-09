import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from "../../providers/database-service";

/*
  Generated class for the EmailRegistration page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-email-registration',
  templateUrl: 'email-registration.html'
})
export class EmailRegistrationPage {
  public usernameField: any;
  public emailField: any;
  public passField: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}


  signUpEmail() {
    this.db.signUpEmail(this.emailField, this.passField, this.usernameField).then(authData => {
      //successful
    console.log('signUp successfully');
  /*
    let loader = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      loader.present();
*/
    }, error => {
      //alert("error logging in: "+ error.message);
      let alert = this.alertCtrl.create({
        title: 'Signup error:',
        subTitle: error.message,
        buttons: ['OK']
      });
    });

  } // signup

}

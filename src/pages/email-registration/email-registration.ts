import { Component, NgZone } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from "../../providers/database-service";
import { GlobalTermsAndConditionsPage } from '../about-this-app/global-terms-and-conditions/global-terms-and-conditions';


@Component({
  selector: 'page-email-registration',
  templateUrl: 'email-registration.html'
})
export class EmailRegistrationPage {
  public usernameField: any;
  public emailField: any;
  public passField: any;
  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {}


  signUpEmail() {
    if(this.emailField && this.passField && this.usernameField) {
      this.db.signUpEmail(this.emailField, this.passField, this.usernameField).then(authData => {
        console.log('signUp successfully');
      }, error => {
        this.zone.run(() => {
          this.errorMessage = error.message;
        });
      });
    }
    else {
      this.errorMessage = "All fields required";
    }
  }

  showTerms() {
    this.navCtrl.push(GlobalTermsAndConditionsPage);
  }

  goBack() {
    this.navCtrl.pop();
  }
}

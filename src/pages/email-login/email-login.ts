import {Component, NgZone} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from "../../providers/database-service";
import {EmailRegistrationPage} from "../email-registration/email-registration";


@Component({
  selector: 'page-email-login',
  templateUrl: 'email-login.html'
})
export class EmailLoginPage {
  public emailField: any;
  public passField: any;
  public errorMessage: any;
  public notFacebook: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, 
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, public zone: NgZone) {
    }


  loginWithEmail() {
    if(this.emailField && this.passField) {
      this.db.loginWithEmail(this.emailField, this.passField).then(authData => {
        console.log('login success');
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

  registryNewEmail() {
    this.navCtrl.push(EmailRegistrationPage);
  }

  showForgotPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Enter Your Email',
      message: "Your new password are sent to your email",
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'registered@email.com',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Submit',
          handler: data => {

            
            let facebookWarning = this.alertCtrl.create({
               title: 'Warning',
               message: "If this e-mail is associated with a Facebook-account you wont be able to login with Facebook anymore",
               buttons: [
        {
          text: 'Abort',
          handler: abort => {

          }
        }, {
          text: 'Continue',
          handler: ok =>{
            //show loadAnimaton
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Resetting your password..'
            });
            loading.present();
          
                //call usersservice
            this.db.forgotPasswordUser(data.recoverEmail).then(() => {
              //add toast
              loading.dismiss().then(() => {  // stop loadAnimation
                //show pop up
                let alert = this.alertCtrl.create({
                  title: 'Check your email',
                  subTitle: 'Password reset successful',
                  buttons: ['OK']
                });
                alert.present();
              })

            }, error => {
              //show pop up
              loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                  title: 'Error resetting password',
                  subTitle: error.message,
                  buttons: ['OK']
                });
                alert.present();
              })


            });
          }
        },
               ]}).present();

               
          }
        }
      ]
    });
    prompt.present();
  }
}

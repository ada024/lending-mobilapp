import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from "../../providers/database-service";
import {EmailRegistrationPage} from "../email-registration/email-registration";

/*
 Generated class for the EmailLogin page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-email-login',
  templateUrl: 'email-login.html'
})
export class EmailLoginPage {
  public emailField: any;
  public passField: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  loginWithEmail() {
    this.db.loginWithEmail(this.emailField, this.passField).then(authData => {
      console.log('login success');
    }, error => {
      //alert("error logging in: "+ error.message);
      let alert = this.alertCtrl.create({
        title: 'Login error:',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
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
          placeholder: 'registered@email.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {


            //show loadAnimaton
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Reseting your password..'
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
        }
      ]
    });
    prompt.present();
  }
}

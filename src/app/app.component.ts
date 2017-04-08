import { Component } from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {ChooseAccountTypePage} from "../pages/choose-account-type/choose-account-type";
import {LoginPage} from "../pages/login/login";
import {AngularFire, FirebaseAuthState} from "angularfire2";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  private authState: FirebaseAuthState;
  public firebase: any;
  rootPage;

  constructor(platform: Platform, private  toastCtrl: ToastController, public af: AngularFire) {

    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;

// Based on user login , sets root page
      if (this.authState) {
        let toast = this.toastCtrl.create({
          message: 'isAleradyLoggedIn true , appcomp',
          duration: 3000
        });
        toast.present();
        this.rootPage = ChooseAccountTypePage;
      } else {
        let toast = this.toastCtrl.create({
          message: 'isAleradyLoggedIn false , appcomp',
          duration: 3000
        });
        toast.present();
        this.rootPage = LoginPage;
      }

    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }

}

import {Component} from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {ChooseAccountTypePage} from "../pages/choose-account-type/choose-account-type";
import {LoginPage} from "../pages/login/login";
import {AngularFire, FirebaseAuthState} from "angularfire2";
import {DatabaseService} from "../providers/database-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  private authState: FirebaseAuthState;
  public firebase: any;
  public rootPage;

  constructor(platform: Platform, public af: AngularFire, private db: DatabaseService) {


    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;

      // Based on user login , sets root page and write user to db
      if (this.authState) {
        this.rootPage = ChooseAccountTypePage;
        this.db.existInDb();
      } else {
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

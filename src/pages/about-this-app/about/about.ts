import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppVersion } from '@ionic-native/app-version';
import { GlobalTermsAndConditionsPage } from '../global-terms-and-conditions/global-terms-and-conditions';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public platform: Platform, public socialSharing: SocialSharing, public appVersion: AppVersion) {
    if (platform.is('cordova')) {
      this.appVersion.getVersionNumber().then(version => {this.version = version});
    }
  }

  goToGlobalTermsAndConditionsPage() {
    this.navCtrl.push(GlobalTermsAndConditionsPage);
  }

  sendMail() {
    if (this.platform.is('cordova')) {
      this.socialSharing.canShareViaEmail().then(() => {
        this.socialSharing.shareViaEmail("", "", ["zahlhuus@gmail.com"]).then((resolve) => {
          this.navCtrl.pop();
        })
      })
    }
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-send-mail',
  templateUrl: 'send-mail.html'
})
export class SendMailPage {
  form = {subject:"",message:""};
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
  public socialSharing: SocialSharing, public db: DatabaseService) {
    this.user = navParams.get("user");
    }

  send() {
    if (this.platform.is('cordova')) {
      this.socialSharing.canShareViaEmail().then(() => {
        this.socialSharing.shareViaEmail(this.form.message, this.form.subject, [this.user.email])
      })
    }
  }
}

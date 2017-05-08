import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { SendMailPage } from '../../../send-mail/send-mail';

@Component({
  selector: 'page-users-details-admin',
  templateUrl: 'users-details-admin.html'
})
export class UsersDetailsAdminPage {
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl: AlertController, public db: DatabaseService) {
    this.user = navParams.get("user");
  }

  goToSendMailPage() {
    this.navCtrl.push(SendMailPage, {user: this.user});
  }

  giveAdminAccess() {
    this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to give this user admin access? This will allow the user to control the entity',
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          this.db.giveUserAdminAccess(this.user);
        }
      }
      ] 
    }).present();
  }

  kickUser() {
    this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to kick this user from the entity?',
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          this.db.kickUser(this.user);
          this.navCtrl.pop();
        }
      }
      ]
    }).present();
  }
}

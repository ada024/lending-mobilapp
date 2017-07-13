import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { UsersAddTagAdminPage } from '../users-add-tag-admin/users-add-tag-admin';
import { SendMailPage } from '../../../send-mail/send-mail';

@Component({
  selector: 'page-users-details-admin',
  templateUrl: 'users-details-admin.html'
})
export class UsersDetailsAdminPage {
  currentEntity;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public zone: NgZone, public db: DatabaseService) {
    this.user = navParams.get("user");
    db.getEntity(this.onEntityLoaded.bind(this));
  }

  onEntityLoaded(currentEntity) {
    this.zone.run(() => {
      this.currentEntity = currentEntity[0];
    });
  }

  goToSendMailPage() {
    this.navCtrl.push(SendMailPage, {user: this.user});
  }

  goToUsersAddTagAdminPage() {
    this.navCtrl.push(UsersAddTagAdminPage, {user: this.user});
  }

  giveAdminAccess() {
    this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to give the user admin access? This will allow the user to control this entity',
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
      message: 'Do you want to kick the user from this entity?',
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

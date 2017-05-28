import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { ChooseAccountTypePage } from "../../choose-account-type/choose-account-type";
import { SettingsAddUserTagPage } from '../settings-add-user-tag/settings-add-user-tag';
import { SettingsTagMakeReadOnlyPage } from '../settings-tag-make-read-only/settings-tag-make-read-only';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  public app: App, public db: DatabaseService) {
  }

  goToChooseAccountTypePage() {
    this.navCtrl.push(ChooseAccountTypePage);
  }

  goToSettingsAddUserTagPage() {
    this.alertCtrl.create({
      title: 'Warning',
      message: 'This will override any previously tag you have registered to identify you with',
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Proceed',
        handler: () => {
          this.navCtrl.push(SettingsAddUserTagPage);
        }
      }
      ]
    }).present();
  }

  goToSettingsTagMakeReadOnlyPage() {
    this.alertCtrl.create({
      title: 'Warning',
      message: 'This action will make the NFC tag "read only", you can still register it for new items and users, but it may not be usable in other apps witch requiers write operations',
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Proceed',
        handler: () => {
          this.navCtrl.push(SettingsTagMakeReadOnlyPage);
        }
      }
      ]
    }).present();
  }

  showNFCSettings() {
    if ((<any>window).nfc != null) {
      (<any>window).nfc.showSettings();
      }
  }
}

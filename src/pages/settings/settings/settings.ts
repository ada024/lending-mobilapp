import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { ChooseAccountTypePage } from "../../choose-account-type/choose-account-type";
import { SettingsAddUserTagPage } from '../settings-add-user-tag/settings-add-user-tag';
import { SettingsTagMakeReadOnlyPage } from '../settings-tag-make-read-only/settings-tag-make-read-only';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public app: App, public db: DatabaseService) {
  }

  goToChooseAccountTypePage() {
    this.navCtrl.setRoot(ChooseAccountTypePage);
  }

  goToSettingsAddUserTagPage() {
    this.navCtrl.push(SettingsAddUserTagPage);
  }

  goToSettingsTagMakeReadOnlyPage() {
    this.navCtrl.push(SettingsTagMakeReadOnlyPage);
  }

  showNFCSettings() {
    if ((<any>window).nfc != null) {
      (<any>window).nfc.showSettings();
      }
  }
}

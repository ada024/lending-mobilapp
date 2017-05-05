import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';


@Component({
  selector: 'page-settings-add-user-tag',
  templateUrl: 'settings-add-user-tag.html'
})
export class SettingsAddUserTagPage {
  close = false;
  success = false;

  constructor(public navCtrl: NavController,
  public navParams: NavParams, public db: DatabaseService,
  public zone: NgZone, public platform: Platform) {
      platform.registerBackButtonAction(this.onBackPressed.bind(this));
      if ((<any>window).nfc != null) {
          (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
          (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
      }
  }

  onTagFound(nfcEvent) {
    if(!this.close) {
      this.zone.run(() => {
        var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
        this.db.setUserTag(tagId).then(() => {
          this.success = true;
        });
      });
      this.close = true;
    }
  }

  onBackPressed() {
    this.close = true;
    this.navCtrl.pop();
  }
}

import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-users-add-tag-admin',
  templateUrl: 'users-add-tag-admin.html'
})
export class UsersAddTagAdminPage {
  close = false;
  success = false;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone,
  public platform: Platform, public db: DatabaseService) {
    this.user = navParams.get("user");
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
        this.db.requestUserTag(tagId, this.user).then(() => {
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

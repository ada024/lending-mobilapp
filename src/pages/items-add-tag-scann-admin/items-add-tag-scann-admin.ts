import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ItemsAddSuccessAdminPage } from '../items-add-success-admin/items-add-success-admin';

@Component({
  selector: 'page-items-add-tag-scann-admin',
  templateUrl: 'items-add-tag-scann-admin.html'
})
export class ItemsAddTagScannAdminPage {
  close = false;
  itemName = "";

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public zone: NgZone,
  public platform: Platform) {
      this.itemName = navParams.get("itemName");
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
        this.navCtrl.push(ItemsAddSuccessAdminPage,{
          itemName: this.itemName,
          tagId: tagId
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

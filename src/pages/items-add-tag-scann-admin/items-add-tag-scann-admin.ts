import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAddSuccessAdminPage } from '../items-add-success-admin/items-add-success-admin';

@Component({
  selector: 'page-items-add-tag-scann-admin',
  templateUrl: 'items-add-tag-scann-admin.html'
})
export class ItemsAddTagScannAdminPage {
  itemName = "";

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public zone: NgZone) {
    this.itemName = navParams.get("itemName");
    try{(<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));}
    catch(error){}
  }

  onTagFound(nfcEvent) {
    this.zone.run(() => {
      var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
      this.navCtrl.push(ItemsAddSuccessAdminPage,{
        itemName: this.itemName,
        tagId: tagId
      });
    });
  }

}

import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { Platform } from 'ionic-angular';
import { ItemsAddSuccessAdminPage } from '../items-add-success-admin/items-add-success-admin';

@Component({
  selector: 'page-items-add-tag-scann-admin',
  templateUrl: 'items-add-tag-scann-admin.html'
})
export class ItemsAddTagScannAdminPage {
  itemName = "";
  photoURI;
  item;
  close = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService,
  public zone: NgZone, public menu: DropDownMenuService, public platform: Platform) {
      this.itemName = navParams.get("itemName");
      this.photoURI = navParams.get("photoURI");
      this.item = navParams.get("item");
      platform.registerBackButtonAction(this.onBackPressed.bind(this));
      if ((<any>window).nfc != null) {
          (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
          (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
      }
  }

  onTagFound(nfcEvent) {
    if(!this.close) {
      this.zone.run(() => {
        let tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
        if(!this.item) {
          this.navCtrl.push(ItemsAddSuccessAdminPage,{
            itemName: this.itemName,
            photoURI: this.photoURI,
            tagId: tagId
          });
        }
        else {
          this.db.getItems().update(this.item.$key, {
            id: tagId
          });
        }
      });
      this.close = true;
    }
  }

  onBackPressed() {
    this.close = true;
    this.navCtrl.pop();
  }
}

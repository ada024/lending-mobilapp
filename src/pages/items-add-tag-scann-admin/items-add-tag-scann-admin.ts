import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ItemsAddSuccessAdminPage } from '../items-add-success-admin/items-add-success-admin';
import { TagUtil, Tag } from '../../classes/tag';

@Component({
  selector: 'page-items-add-tag-scann-admin',
  templateUrl: 'items-add-tag-scann-admin.html'
})
export class ItemsAddTagScannAdminPage {
   dataReceived: boolean;
  close = false;
  itemName = "";
  tag: Tag;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public zone: NgZone,
  public platform: Platform) {

      this.tag = new Tag();

      console.log("kommer til scanklassen");
      this.itemName = navParams.get("itemName");

      if ((<any>window).nfc != null) {
          (<any>window).nfc.addNdefListener((tagEvent: Event) => this.tagListenerSuccess(tagEvent));
          (<any>window).nfc.addTagDiscoveredListener((tagEvent: Event) => this.tagListenerSuccess(tagEvent));
      }

    platform.registerBackButtonAction(this.onBackPressed.bind(this));
  }

  /*onTagFound(nfcEvent) {
      console.log("tag funnet");
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
  }*/

  tagListenerSuccess(tagEvent: Event) {
      console.log(tagEvent);
      if (!this.close) {
          this.zone.run(() => {
              this.tag = TagUtil.readTagFromJson(tagEvent);
              var tagId = (<any>window).nfc.bytesToHexString(this.tag.id);
              this.dataReceived = true;
              this.navCtrl.push(ItemsAddSuccessAdminPage, {
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

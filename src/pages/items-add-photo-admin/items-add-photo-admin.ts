import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAddTagAdminPage } from '../items-add-tag-admin/items-add-tag-admin';

@Component({
  selector: 'page-items-add-photo-admin',
  templateUrl: 'items-add-photo-admin.html'
})
export class ItemsAddPhotoAdminPage {
  itemName = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemName = navParams.get("itemName");
  }

  goToItemsAddTagAdminPage(){
    this.navCtrl.push(ItemsAddTagAdminPage,{itemName: this.itemName});
  }
}

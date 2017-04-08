import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAddPhotoAdminPage } from '../items-add-photo-admin/items-add-photo-admin';

@Component({
  selector: 'page-items-add-name-admin',
  templateUrl: 'items-add-name-admin.html'
})
export class ItemsAddNameAdminPage {
  itemName = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToItemsAddPhotoAdminPage(){
    this.navCtrl.push(ItemsAddPhotoAdminPage,{itemName: this.itemName});
  }
}

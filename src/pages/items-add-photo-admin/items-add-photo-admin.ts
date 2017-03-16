import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-items-add-photo-admin',
  templateUrl: 'items-add-photo-admin.html'
})
export class ItemsAddPhotoAdminPage {
  itemName = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemName = navParams.get("itemName");
  }
}

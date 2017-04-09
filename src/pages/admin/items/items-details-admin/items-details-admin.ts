import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-items-details-admin',
  templateUrl: 'items-details-admin.html'
})
export class ItemsDetailsAdminPage {
  modify = false;
  item;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("item");
  }
}

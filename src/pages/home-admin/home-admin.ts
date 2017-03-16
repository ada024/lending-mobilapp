import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAdminPage } from '../items-admin/items-admin';

@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html'
})
export class HomeAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToItemsAdminPage() {
    this.navCtrl.push(ItemsAdminPage);
  }

}

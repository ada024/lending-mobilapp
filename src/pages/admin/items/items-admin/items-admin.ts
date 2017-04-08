import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAddNameAdminPage } from '../items-add-name-admin/items-add-name-admin';
import { ItemsListAdminPage } from '../items-list-admin/items-list-admin';

@Component({
  selector: 'page-items-admin',
  templateUrl: 'items-admin.html'
})

export class ItemsAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToItemsListAdminPage() {
     this.navCtrl.push(ItemsListAdminPage);
  }

  goToItemsAddNameAdminPage(){
    this.navCtrl.push(ItemsAddNameAdminPage);
  }

}

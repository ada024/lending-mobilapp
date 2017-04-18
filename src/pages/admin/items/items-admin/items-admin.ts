import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemsAddNameAdminPage } from '../items-add-name-admin/items-add-name-admin';
import { ItemsListAdminPage } from '../items-list-admin/items-list-admin';

@Component({
  selector: 'page-items-admin',
  templateUrl: 'items-admin.html'
})

export class ItemsAdminPage {
  numberOfItems;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
  }

  onNumberOfItemsLoaded(numberOfItems) {
    this.zone.run(() => {
      this.numberOfItems = numberOfItems;
    });
  }

  goToItemsListAdminPage() {
     this.navCtrl.push(ItemsListAdminPage);
  }

  goToItemsAddNameAdminPage(){
    this.navCtrl.push(ItemsAddNameAdminPage);
  }

}

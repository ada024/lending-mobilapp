import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

@Component({
  selector: 'page-items-add-success-admin',
  templateUrl: 'items-add-success-admin.html',
  providers: [DatabaseService]
})
export class ItemsAddSuccessAdminPage {
  itemName = "";
  tagId = "0";
  photoURI;
  currentEntity;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.itemName = navParams.get("itemName");
    this.photoURI = navParams.get("photoURI");
    let tagId = navParams.get("tagId");
    if (tagId) {
      this.tagId = tagId;
    }
    this.navCtrl.remove(2, 10);
    db.getEntity(this.onEntityLoaded.bind(this));
  }

  onEntityLoaded(entity){
    this.currentEntity = entity[0];
    this.db.addItem(this.itemName, this.tagId, this.photoURI, this.currentEntity.reservationDays);
  }

  goBackToItemsAdminPage() {
    this.navCtrl.pop();
  }
}
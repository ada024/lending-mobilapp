import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

@Component({
  selector: 'page-items-add-success-admin',
  templateUrl: 'items-add-success-admin.html',
  providers: [DatabaseService]
})
export class ItemsAddSuccessAdminPage {
  titleText = "Success. Added"
  itemName = "";
  tagId = "0";
  photoURI;
  currentEntity;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.itemName = navParams.get("itemName");
    let photoURI = navParams.get("photoURI");
    let tagId = navParams.get("tagId");
    db.getEntity(this.onEntityLoaded.bind(this));
    if(tagId != null) {
      this.tagId = tagId;
      this.titleText = "Success. Added and Encoded";
    }
    if(photoURI != null) {
      this.photoURI = photoURI;
    }
    this.db.addItem(this.itemName, this.tagId, this.photoURI, this.currentEntity.reservationDays);
    this.navCtrl.remove(2, 10);
  }

onEntityLoaded(entity){
this.currentEntity = entity[0];
}

  goBackToItemsAdminPage() {
    this.navCtrl.pop();
  }
}
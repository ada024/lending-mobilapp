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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.itemName = navParams.get("itemName");
    let tagId = navParams.get("tagId");
    if(tagId != null) {
      this.tagId = tagId;
    }
    this.db.addItem(this.itemName, this.tagId);
    this.navCtrl.remove(3, 10);
  }


  goBackToItemsAdminPage() {
    this.navCtrl.pop();
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

@Component({
  selector: 'page-items-add-success-admin',
  templateUrl: 'items-add-success-admin.html',
  providers: [DatabaseService]
})
export class ItemsAddSuccessAdminPage {
  titleText = "Success. Added"
  itemName = "";
  tagId = "0";

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public db: DatabaseService) {
    this.itemName = navParams.get("itemName");
    this.tagId = navParams.get("tagId");
    if(this.tagId == null) {this.tagId = "0";}
    this.add();

    this.navCtrl.remove(4, 10);
  }

  add() {
    //validate input?

    this.db.addItem({name: this.itemName, id: this.tagId});
  }

  goBackToItemsAdminPage() {
    this.navCtrl.remove(4, 4);
    this.navCtrl.pop();
  }
}

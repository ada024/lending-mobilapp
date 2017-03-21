import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { ItemsAddNameAdminPage } from '../items-add-name-admin/items-add-name-admin';

@Component({
  selector: 'page-items-admin',
  templateUrl: 'items-admin.html',
  providers: [DatabaseService]
})

export class ItemsAdminPage {
  showInputs = false;
  tagFound = true;
  input = "";
  id = "Scan tag..";
  items;
  users;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public db: DatabaseService) {
    try{(<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));}
    catch(error){}
    this.items = db.getItems();
    this.users = db.getUsers();
  }

    onTagFound(nfcEvent) {
      this.zone.run(() => {
        this.id = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
        this.tagFound = true;
      });
    }

  add() {
    //validate input?

    this.db.addItem(this.input, this.id);
    this.showInputs = false;

    //this.tagFound = false;
    this.input = "";
    this.id = "Scan tag..";
  }

  populateDatabase() {
    this.db.populateDatabase();
  }

  clearDatabase(){
    this.db.clearDatabase();
  }

  goToItemsListAdminPage() {
    
  }

  goToItemsAddNameAdminPage(){
    this.navCtrl.push(ItemsAddNameAdminPage);
  }

}

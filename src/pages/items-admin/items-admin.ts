import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';


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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public db: DatabaseService) {
    try{(<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));}
    catch(error){}
    this.items = db.getItems();
  }

    onTagFound(nfcEvent) {
      this.zone.run(() => {
        this.id = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
        this.tagFound = true;
      });
    }

  add() {
    //validate input?

    this.db.addItem({name: this.input, id: this.id});
    this.showInputs = false;

    //this.tagFound = false;
    this.input = "";
    this.id = "Scan tag..";
  }

  clear(){
    this.db.clear();
  }

}

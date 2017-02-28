import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';


@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
  providers: [DatabaseService]
})

export class ItemsPage {
  showInputs = false;
  tagFound = true;
  input = "";
  text = "Scan tag..";
  items;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseService) {
    try{(<any>window).nfc.addNdefListener(this.onTagFound);}
    catch(error){}
    this.items = db.getItems();
  }

  onTagFound(nfcEvent) {
    var bytes = nfcEvent.tag.ndefMessage[0].payload;
    var result = "";
    for (var i = 3; i < bytes.length; i++) {
      result += String.fromCharCode(bytes[i]);
    }
    this.text = "Success";
    this.tagFound = true;
    console.log(result);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

  addItem() {
    this.showInputs = true;
  }

  add() {
    this.db.addItem({name:this.input, id:"3"});
    this.showInputs = false;
    this.input = "";
  }

}

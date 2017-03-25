import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

/*
  Generated class for the DeveloperTools page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-developer-tools',
  templateUrl: 'developer-tools.html',
  providers: [DatabaseService]
})
export class DeveloperToolsPage {
  showInputs = false;
  tagFound = true;
  input = "";
  id = "Scan tag..";
  items;
  users;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public db: DatabaseService) {
    this.items = db.getItems();
    this.users = db.getUsers();
  }

  add() {
    this.db.addItem(this.input, this.id);
    this.showInputs = false;
    this.input = "";
    this.id = "Scan tag..";
  }

  populateDatabase() {
    this.db.populateDatabase();
  }

  clearDatabase(){
    this.db.clearDatabase();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeveloperToolsPage');
  }

}

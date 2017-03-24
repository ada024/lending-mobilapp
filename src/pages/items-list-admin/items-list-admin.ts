import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

/*
  Generated class for the ItemsListAdmin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-items-list-admin',
  templateUrl: 'items-list-admin.html',
  providers: [DatabaseService]
})
export class ItemsListAdminPage {
  items;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public db: DatabaseService) {
    this.items = db.getItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsListAdminPage');
  }

}

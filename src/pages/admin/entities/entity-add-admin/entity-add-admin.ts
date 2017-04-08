import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-entity-add-admin',
  templateUrl: 'entity-add-admin.html'
})
export class EntityAddAdminPage {
  currentUser = "";
  entityName = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.currentUser = this.db.currentUserName;
  }

  addNewEntity() {
    this.db.addEntity(this.entityName);
    this.navCtrl.pop();
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityOfficeAdminPage } from '../entity-office-admin/entity-office-admin';


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
      this.navCtrl.push(EntityOfficeAdminPage, { entityName: this.entityName });
  }

}

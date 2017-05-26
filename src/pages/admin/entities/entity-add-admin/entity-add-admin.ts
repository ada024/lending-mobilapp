import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { EntityOfficeAdminPage } from '../entity-office-admin/entity-office-admin';


@Component({
  selector: 'page-entity-add-admin',
  templateUrl: 'entity-add-admin.html'
})
export class EntityAddAdminPage {
  currentUser = "";
  entityName = "";
  notAdded: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public menu: DropDownMenuService, public db: DatabaseService) {
      this.currentUser = this.db.currentUserName;
  }

  addNewEntity() {
      if (this.entityName.length!=0) {
          this.navCtrl.push(EntityOfficeAdminPage, { entityName: this.entityName });
      }
      else this.notAdded = true;
  }

}

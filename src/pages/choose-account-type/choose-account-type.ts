import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { DropDownMenuService} from '../../providers/drop-down-menu-service';
import { HomeAdminPage } from '../admin/home-admin/home-admin';
import { HomeUserPage } from '../user/home-user/home-user';


@Component({
  selector: 'page-choose-account-type',
  templateUrl: 'choose-account-type.html'
})
export class ChooseAccountTypePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db: DatabaseService, public menu: DropDownMenuService) {}

  goToHomeAdminPage() {
    this.db.setUserIsAdmin(true);
    this.db.setEntity({name: "No entity"});
    this.navCtrl.setRoot(HomeAdminPage);
  }

  goToHomeUserPage() {
    this.db.setUserIsAdmin(false);
    this.db.setEntity({name: "No entity"});
    this.navCtrl.setRoot(HomeUserPage);
  }

  logout(): void {
    this.db.logout();
  }

  customButton(): void {
    this.db.msgToast("Check console.log");
    this.db.listUsers();
  }



}


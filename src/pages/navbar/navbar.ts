import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { DropdownMenuPage } from '../dropdown-menu/dropdown-menu';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
  public db: DatabaseService, public app: App) {}

  openDropdownMenu(event) {
    this.popoverCtrl.create(DropdownMenuPage).present({
      ev: event
    });
  }

  goHome() {
    if (this.app.getRootNav().getActive().name != "HomeAdminPage"
    && this.app.getRootNav().getActive().name != "HomeUserPage"
    && this.db.currentUser && this.db.currentUser.adminRole) {
      this.navCtrl.popToRoot();
    }
  }
}

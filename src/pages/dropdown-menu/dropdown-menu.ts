import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-dropdown-menu',
  templateUrl: 'dropdown-menu.html'
})
export class DropdownMenuPage {
  db;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, public app: App) {
    this.db = navParams.get("db");
  }

  goToSettingsPage() {
    this.viewCtrl.dismiss().then(() => {
      if (this.app.getRootNav().getActive().name != "SettingsPage")
        this.app.getRootNav().push(SettingsPage, {db: this.db});
    });
  }

  logout() {
    this.viewCtrl.dismiss();
    this.db.logout();
  }
}

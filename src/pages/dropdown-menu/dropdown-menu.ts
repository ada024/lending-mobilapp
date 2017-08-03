import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { SettingsPage } from '../settings/settings/settings';
import { AboutPage } from '../about-this-app/about/about';


@Component({
  selector: 'page-dropdown-menu',
  templateUrl: 'dropdown-menu.html'
})
export class DropdownMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, public app: App, public db: DatabaseService) {
  }

  goToSettingsPage() {
    this.viewCtrl.dismiss().then(() => {
      if (this.app.getRootNav().getActive().name != "SettingsPage")
        this.app.getRootNav().push(SettingsPage);
    });
  }

  goToAboutPage() {
    this.viewCtrl.dismiss().then(() => {
      if (this.app.getRootNav().getActive().name != "AboutPage")
        this.app.getRootNav().push(AboutPage);
    });
  }

  logout() {
    this.viewCtrl.dismiss();
    this.db.logout();
  }
}

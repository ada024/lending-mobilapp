import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-dropdown-menu',
  templateUrl: 'dropdown-menu.html'
})
export class DropdownMenuPage {
  userName;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.userName = navParams.get("userName");
  }

  logout() {
    this.viewCtrl.dismiss();
    this.navParams.get("logoutFunc")();
  }
}

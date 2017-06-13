import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { DropdownMenuPage } from '../dropdown-menu/dropdown-menu';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public popoverCtrl: PopoverController, public db: DatabaseService) {}

  openDropdownMenu(event) {
    this.popoverCtrl.create(DropdownMenuPage).present({
      ev: event
    });
  }

  goHome() {
    if (this.db.currentUser && this.db.currentUser.adminRole) {
      this.navCtrl.popToRoot();
    }
  }

  trimUsername(username){
      var length = 25;
      if(username.length>length){
                   username = username.substring(0, length - 3) + "...";
      }
      return username;
  }
}

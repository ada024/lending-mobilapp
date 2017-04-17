import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersListAdminPage } from '../users-list-admin/users-list-admin';
import { UsersPendingAdminPage } from '../users-pending-admin/users-pending-admin';


@Component({
  selector: 'page-users-admin',
  templateUrl: 'users-admin.html'
})
export class UsersAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToUsersListAdminPage() {
    this.navCtrl.push(UsersListAdminPage);
  }

  goToUsersPendingAdminPage() {
    this.navCtrl.push(UsersPendingAdminPage);
  }
}

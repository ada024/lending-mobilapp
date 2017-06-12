import { Component, NgZone } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { UsersDetailsAdminPage } from '../users-details-admin/users-details-admin';


@Component({
  selector: 'page-users-list-admin',
  templateUrl: 'users-list-admin.html'
})
export class UsersListAdminPage {
  usersList: any;
  loadedUserList: any;
  searchString = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService, public appCtrl: App) {
    db.loadUsersInThisEntity(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
    this.zone.run(() => {
      this.usersList = this.loadedUserList = loadedList;
    });
  }

  search(){
    this.usersList = this.db.search(this.loadedUserList, this.searchString, "v.fullname");
  }

  goToUsersDetailsAdminPage(user) {
    this.appCtrl.getRootNav().push(UsersDetailsAdminPage, {user: user});
  }
}

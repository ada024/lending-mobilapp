import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UsersListAdminPage} from '../users-list-admin/users-list-admin';
import {UsersPendingAdminPage} from '../users-pending-admin/users-pending-admin';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-users-tabs',
  templateUrl: 'users-tabs.html'
})
export class UsersTabsPage {
RegisteredUsers = UsersListAdminPage;
PendingUsers = UsersPendingAdminPage;
numberOfUsers:any;
numberOfPendingUsers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    
    db.loadUsersInThisEntity(this.onUsersLoaded.bind(this));
    db.loadPendingUsersInThisEntity(this.onNumberOfPendingUsersLoaded.bind(this));
  }


 onUsersLoaded(users) {
    this.zone.run(() => {
      this.numberOfUsers = users.length;
    });
  }

  onNumberOfPendingUsersLoaded(pendingUsers) {
      this.zone.run(() => {
          this.numberOfPendingUsers = pendingUsers.length;
      });
  }
}

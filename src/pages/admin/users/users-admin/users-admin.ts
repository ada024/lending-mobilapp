import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { UsersListAdminPage } from '../users-list-admin/users-list-admin';
import { UsersPendingAdminPage } from '../users-pending-admin/users-pending-admin';


@Component({
  selector: 'page-users-admin',
  templateUrl: 'users-admin.html'
})
export class UsersAdminPage {
  numberOfPendingUsers;
  numberOfUsers;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService, public menu: DropDownMenuService) {
    db.loadPendingUsersInThisEntity(this.onNumberOfPendingUsersLoaded.bind(this));
    db.loadUsersInThisEntity(this.onUsersLoaded.bind(this));
  }

  onNumberOfPendingUsersLoaded(pendingUsers) {
    this.zone.run(() => {
      this.numberOfPendingUsers = pendingUsers.length;
    });
  }

  onUsersLoaded(users) {
    this.zone.run(() => {
      this.numberOfUsers = users.length;
    });
  }

  goToUsersListAdminPage() {
    this.navCtrl.push(UsersListAdminPage);
  }

  goToUsersPendingAdminPage() {
    this.navCtrl.push(UsersPendingAdminPage);
  }
}

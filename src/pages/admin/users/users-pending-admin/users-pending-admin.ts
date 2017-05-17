import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';


@Component({
  selector: 'page-users-pending-admin',
  templateUrl: 'users-pending-admin.html'
})
export class UsersPendingAdminPage {
  pendingUsers: any;
	loadedPendingUsers: any;
	searchString = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService, public menu: DropDownMenuService) {
    this.db.loadPendingUsersInThisEntity(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
    this.zone.run(() => {
      this.pendingUsers = this.loadedPendingUsers = loadedList;
    });
  }

  search(){
    this.pendingUsers = this.db.search(this.loadedPendingUsers, this.searchString, "v.userName");
  }

  acceptUser(pendingUser) {
    this.db.acceptPendingUser(pendingUser);
  }

  declineUser(pendingUser) {
    this.db.declinePendingUser(pendingUser);
  }
}

import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { CheckoutItemsPage } from '../checkout/checkout-items/checkout-items';
import { CheckinFirstPage } from '../checkin/checkin-first/checkin-first';
import { ItemsAdminPage } from '../items/items-admin/items-admin';
import { UsersAdminPage } from '../users/users-admin/users-admin';
import { EntityAdminPage } from '../entities/entity-admin/entity-admin';
import { DeveloperToolsPage } from '../developer-tools/developer-tools';

@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html'
})
export class HomeAdminPage {
  numberOfUsers;
  numberOfItems;
  numberOfPendingUsers;
  //numberOfReservations;
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    db.loadUsersInThisEntity(this.onUsersLoaded.bind(this));
    db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
    db.loadPendingUsersInThisEntity(this.onNumberOfPendingUsersLoaded.bind(this));
    db.loadItems(this.onItemsLoaded.bind(this));
    //db.loadReservationsInThisEntity(this.onReservationsLoaded.bind(this), this.items);
  }


  onItemsLoaded(loadedList) {
      this.zone.run(() => {
          this.items = loadedList;
      });
  }
    /*
  onReservationsLoaded(loadedList) {
      this.zone.run(() => {
          this.numberOfReservations = loadedList;
      });
  }
*/
  onNumberOfPendingUsersLoaded(pendingUsers) {
      this.zone.run(() => {
          this.numberOfPendingUsers = pendingUsers.length;
      });
  }

  onNumberOfItemsLoaded(numberOfItems) {
    this.zone.run(() => {
      this.numberOfItems = numberOfItems;
    });
  }

  onUsersLoaded(users) {
    this.zone.run(() => {
      this.numberOfUsers = users.length;
    });
  }

  goToCheckOut() {
    this.navCtrl.push(CheckoutItemsPage);
  }
  
  goToCheckIn() {
    this.navCtrl.push(CheckinFirstPage);
  }
  
  goToItemsAdminPage() {
    this.navCtrl.push(ItemsAdminPage);
  }

  goToUsersAdminPage() {
    this.navCtrl.push(UsersAdminPage);
  }

  goToEntityAdminPage() {
    this.navCtrl.push(EntityAdminPage);
  }

  goToDeveloperToolsAdminPage() {
    this.navCtrl.push(DeveloperToolsPage);
  }

  openDropdownMenu(event) {
    this.db.openDropdownMenu(event);
  }
}

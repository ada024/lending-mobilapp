import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { CheckoutFirstPage } from '../checkout/checkout-first/checkout-first';
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
  currentEntity;
  numberOfUsers;
  numberOfItems;
  numberOfPendingUsers;
  numberOfReservationRequests;
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    db.loadUsersInThisEntity(this.onUsersLoaded.bind(this));
    db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
    db.loadPendingUsersInThisEntity(this.onNumberOfPendingUsersLoaded.bind(this));
    db.loadItems(this.onItemsLoaded.bind(this));
    db.loadNumberOfReservationRequests(this.onNumberOfReservationRequestsLoaded.bind(this));
    db.loadCurrentUser(this.onCurrentEntityLoaded.bind(this));
  }

  onCurrentEntityLoaded(currentUser) {
    this.zone.run(() => {
      this.currentEntity = currentUser.entity;
    });
  }


  onItemsLoaded(loadedList) {
      var loaded = false;
      this.zone.run(() => {
          this.items = loadedList;

      });
      
  }
  onNumberOfReservationRequestsLoaded(numberOfReservationRequests){
      this.zone.run(() => {
          this.numberOfReservationRequests = numberOfReservationRequests;
      });
  } 
      
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
    this.navCtrl.push(CheckoutFirstPage);
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
}

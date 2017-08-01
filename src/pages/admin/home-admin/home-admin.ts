import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { DropdownMenuPage } from '../../dropdown-menu/dropdown-menu';
import { CheckoutFirstPage } from '../checkout/checkout-first/checkout-first';
import { CheckinFirstPage } from '../checkin/checkin-first/checkin-first';
import { ItemsTabsPage } from '../items/items-tabs/items-tabs';
import { UsersTabsPage } from '../users/users-tabs/users-tabs';
import { EntityAdminPage } from '../entities/entity-admin/entity-admin';

@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html'
})
export class HomeAdminPage {
  currentEntity;
  numberOfUsers;
  numberOfItems;
  numberOfPendingUsers;
  numberOfReservations;
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController,
  public zone: NgZone, public db: DatabaseService) {
    db.loadUsersInThisEntity(this.onUsersLoaded.bind(this));
    db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
    db.loadPendingUsersInThisEntity(this.onNumberOfPendingUsersLoaded.bind(this));
    db.loadItems(this.onItemsLoaded.bind(this));
    db.loadNumberOfReservedItems(this.onNumberOfResLoaded.bind(this));
    db.loadCurrentUser(this.onCurrentEntityLoaded.bind(this));
    db.isReservationOutdated();
  }

  onCurrentEntityLoaded(currentUser) {
    this.zone.run(() => {
      this.currentEntity = currentUser.entityName;
    });
  }

onNumberOfResLoaded(numberOfRes){
  this.zone.run(() => {
  this.numberOfReservations = numberOfRes;
  });
}

  onItemsLoaded(loadedList) {
      this.zone.run(() => {
          this.items = loadedList;
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
    if(this.db.currentUser.entity != "No library, join a library to get started") {
    this.db.removeTemporaryItems();
      this.navCtrl.push(CheckoutFirstPage);
    }
  }
  
  goToCheckIn() {
    if(this.db.currentUser.entity != "No library, join a library to get started") {
      this.navCtrl.push(CheckinFirstPage);
    }
  }
  
  goToItemsAdminPage() {
    if(this.db.currentUser.entity != "No library, join a library to get started") {
      this.navCtrl.push(ItemsTabsPage);
    }
  }

  goToUsersAdminPage() {
    if(this.db.currentUser.entity != "No library, join a library to get started") {
      this.navCtrl.push(UsersTabsPage);
    }
  }

  goToEntityAdminPage() {
    this.navCtrl.push(EntityAdminPage);
  }

  openDropdownMenu(event) {
    this.popoverCtrl.create(DropdownMenuPage).present({
      ev: event
    });
  }

   trimUsername(username){
      var length = 30;
      if(username.length>length){
                   username = username.substring(0, length - 3) + "...";
      }
      return username;
  }
}

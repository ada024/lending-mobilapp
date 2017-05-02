import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { EntityUserPage } from '../entities/entity-user/entity-user';
import { ItemListUserPage } from '../items/item-list-user/item-list-user';

@Component({
    selector: 'page-home-user',
    templateUrl: 'home-user.html',
})
export class HomeUserPage {
    numberOfItems;
    pendingLoans;
    loans;
    reservations;
    currentEntity;
    dueDays = [];

    resTest;
    //pendingLoans2 = [{itemName: "a"},{itemName: "b"}];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public zone: NgZone, public db: DatabaseService) {
        db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
        db.loadPendingLoans(this.onPendingLoansLoaded.bind(this));
        db.loadLoans(this.onLoansLoaded.bind(this));
        db.loadUsersReservations(this.onReservationsLoaded.bind(this));
        db.loadCurrentUser(this.onCurrentEntityLoaded.bind(this));



    }

    onCurrentEntityLoaded(currentUser) {
        this.zone.run(() => {
            this.currentEntity = currentUser.entity;
        });
    }

    onReservationsLoaded(usersReservations) {
        this.zone.run(() => {
            this.reservations = usersReservations;
            this.reservations.sort((date1, date2) => date1.reserved.pickupDate - date2.reserved.pickupDate);
        });
    }

  acceptLoan(pendingLoan) {
    this.db.deletePendingLoan(pendingLoan);
    this.db.addLoan(pendingLoan.itemName, pendingLoan.itemOwnerName, pendingLoan.itemOwnerUid);
  }

  goToEntityUserPage() {
    this.navCtrl.push(EntityUserPage);
  }

  goToItemlistUserPage() {
      this.navCtrl.push(ItemListUserPage);
  }

  onPendingLoansLoaded(loadedList) {
    this.zone.run(() => {
      this.pendingLoans = loadedList;
    });
  }

  onLoansLoaded(loadedList) {
    this.zone.run(() => {
      this.loans = loadedList;
    });
  }

  onNumberOfItemsLoaded(numberOfItems) {
    this.zone.run(() => {
      this.numberOfItems = numberOfItems;
    });
  }

  openDropdownMenu(event) {
    this.db.openDropdownMenu(event);
  }

  dueDate(item) {
      var currentDate = new Date();
      currentDate.setHours(0o0, 0o0);
      var itemDate = item.reserved.pickupDate;
      var oneDay = 24 * 60 * 60 * 1000;
      var diffDays = Math.round(Math.abs((itemDate - currentDate.getTime()) / (oneDay)));
      return diffDays;
  }
  
}

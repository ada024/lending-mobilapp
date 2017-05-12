import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { DropDownMenuService} from '../../../providers/drop-down-menu-service';
import { EntityUserPage } from '../entities/entity-user/entity-user';
import { ItemsTabsUserPage } from '../items/items-tabs-user/items-tabs-user';
import { Loan } from '../../../app/models/loan';

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
    returnDate: any;

    resTest;
    //pendingLoans2 = [{itemName: "a"},{itemName: "b"}];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public zone: NgZone, public db: DatabaseService, public menu: DropDownMenuService) {
        db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
        db.loadPendingLoans(this.onPendingLoansLoaded.bind(this));
        db.loadLoans(this.onLoansLoaded.bind(this));
        db.loadUsersReservations(this.onReservationsLoaded.bind(this));
        db.loadCurrentUser(this.onCurrentEntityLoaded.bind(this));
    }

    onCurrentEntityLoaded(currentUser) {
        this.zone.run(() => {
            this.currentEntity = currentUser.entityName;
        });
    }

    onReservationsLoaded(usersReservations) {
        this.zone.run(() => {
            this.reservations = usersReservations;
            if(this.reservations!=null){
            this.reservations.sort((date1, date2) => date1.pickupDate - date2.pickupDate);
        }
        });
    }

    acceptLoan(pendingLoan) {
        var loan = new Loan(pendingLoan.pendingLoan.loaner, pendingLoan.pendingLoan.itemOwnerName, pendingLoan.pendingLoan.formattedDate, pendingLoan.pendingLoan.timeInMillis);
        this.db.addLoan(loan, pendingLoan);
       this.db.deletePendingLoan(pendingLoan);
  }

  goToEntityUserPage() {
    this.navCtrl.push(EntityUserPage);
  }

  goToItemlistUserPage() {
      this.navCtrl.push(ItemsTabsUserPage);
  }

  onPendingLoansLoaded(loadedList) {
    this.zone.run(() => {
        this.pendingLoans = loadedList;
    });
  }

  onLoansLoaded(loadedList) {
    this.zone.run(() => {
        this.loans = loadedList;
        this.loans.sort((date1, date2) => date1.loan.timeInMillis - date2.loan.timeInMillis);
    });
  }

  onNumberOfItemsLoaded(numberOfItems) {
    this.zone.run(() => {
      this.numberOfItems = numberOfItems;
    });
  }

  dueDate(itemDate) {
      var currentDate = new Date();
      currentDate.setHours(0o0, 0o0);
      var oneDay = 24 * 60 * 60 * 1000;
      var diffDays = Math.round(Math.abs((itemDate - currentDate.getTime()) / (oneDay)));
      var returnText;
      if (diffDays == 0) {
          returnText = "today";
      }
      else if (diffDays == 1) {
          returnText = " in " + diffDays + " day";
      }
      else if (diffDays > 1) {
          returnText = " in " + diffDays + " days";
      }
      return returnText;
  }
  

}

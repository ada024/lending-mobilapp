import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
import { EntityUserPage } from '../entities/entity-user/entity-user';

@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html',
})
export class HomeUserPage {
  numberOfItems;
  pendingLoans;
  loans;
  //pendingLoans2 = [{itemName: "a"},{itemName: "b"}];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
    db.loadPendingLoans(this.onPendingLoansLoaded.bind(this));
    db.loadLoans(this.onLoansLoaded.bind(this));
  }

  acceptLoan(pendingLoan) {
    this.db.deletePendingLoan(pendingLoan);
    this.db.addLoan(pendingLoan.itemName, pendingLoan.itemOwnerName, pendingLoan.itemOwnerUid);
  }

  goToEntityUserPage() {
    this.navCtrl.push(EntityUserPage);
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
  
}

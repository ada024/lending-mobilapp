import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../providers/database-service';
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
    map;

    resTest;
    //pendingLoans2 = [{itemName: "a"},{itemName: "b"}];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public zone: NgZone, public db: DatabaseService) {
        db.loadNumberOfItems(this.onNumberOfItemsLoaded.bind(this));
        db.loadPendingLoans(this.onPendingLoansLoaded.bind(this));
        db.loadLoans(this.onLoansLoaded.bind(this));
        db.loadUsersReservations(this.onReservationsLoaded.bind(this));
        db.loadCurrentUser(this.onCurrentEntityLoaded.bind(this));
        db.loadUserEntityMap(this.onMapLoaded.bind(this))
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
        var userEmail =  null;
        if(pendingLoan.pendingLoan.userEmail!=null){
            userEmail = pendingLoan.pendingLoan.userEmail;
        }

        var loan = new Loan(pendingLoan.pendingLoan.entityName, pendingLoan.pendingLoan.userPhoto, userEmail, pendingLoan.pendingLoan.loaner, pendingLoan.pendingLoan.loanerName, pendingLoan.pendingLoan.itemOwnerName, pendingLoan.pendingLoan.formattedDate, pendingLoan.pendingLoan.formattedShortDate, pendingLoan.pendingLoan.timeInMillis);
        this.db.addLoan(loan, pendingLoan);
       this.db.deletePendingLoan(pendingLoan);
  }

  dismissLoan(pendingLoan){
      this.db.deletePendingLoan(pendingLoan);
  }

  goToEntityUserPage() {
    this.navCtrl.push(EntityUserPage);
  }

  goToItemlistUserPage() {
      if(this.db.currentUser.entity != "No entity, join an entity to get started") {
          this.navCtrl.push(ItemsTabsUserPage);
      }
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

  onMapLoaded(map) {
      this.zone.run(() => {
        this.map = map.filter(x => {return x.userUid == this.db.currentUser.uid})
        .filter(x => {return x.newUser});
    });
  }

  dueDate(itemDate) {
      var currentDate = new Date();
      currentDate.setHours(0o0, 0o0);
      var oneDay = 24 * 60 * 60 * 1000;
      var diffDays = Math.round((itemDate - currentDate.getTime()) / (oneDay));
      var returnText;
      if (diffDays < 0) {
          returnText = 'Deadline expired ' + Math.abs(diffDays) + ' days ago';
      }
      if (diffDays == 0) {
          returnText = "today";
      }
      else if (diffDays == 1) {
          returnText = "in " + diffDays + " day";
      }
      else if (diffDays > 1) {
          returnText = "in " + diffDays + " days";
      }
      return returnText;
  }
  
  declineUserTag() {
      this.db.declineUserTag();
  }

  acceptUserTag() {
      this.alertCtrl.create({
        title: 'Confirm',
        message: 'This will override any previously registered tag you have',
        buttons: [
        {
            text: 'Cancel',
        },
        {
            text: 'Confirm',
            handler: () => {
                this.db.acceptUserTag();
            }
        }
        ] 
    }).present();
  }


removeReservation(reservation){
     this.alertCtrl.create({
        title: 'Delete reservation?',
        message: 'Do you really want to delete this reservation?',
        buttons: [
        {
            text: 'No',
        },
        {
            text: 'Yes',
            handler: () => {
                  var resList = [];
                  var item = this.db.getItemByKey(reservation.itemKey);
            resList = item.reserved;
            for(var res of resList){
            if(res.pickupDate==reservation.pickupDate&&res.returnDate==reservation.returnDate&&res.itemKey==reservation.itemKey){
            var index = resList.indexOf(res);
            if (resList.length > -1) {
            resList.splice(index, 1);
            this.db.addReservation(resList, item);
            break;
}
        }
    }
            }
        }
        ] 
    }).present();
  }

  ok(map) {
      this.db.confirmNewEntity(map);
  }

  goTo(map) {
      this.db.confirmNewEntity(map);
      this.db.setEntity({
          $key: map.entity,
          name: map.entityName
      });
  }

  trimString(wordToBeTrimmed){
      var length = 16;
      if(wordToBeTrimmed.length>length){
                   wordToBeTrimmed = wordToBeTrimmed.substring(0, length - 3) + "...";
      }
      return wordToBeTrimmed;
  }

}

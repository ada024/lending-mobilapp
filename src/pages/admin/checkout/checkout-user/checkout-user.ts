import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutReturnDatePage } from '../checkout-return-date/checkout-return-date';

/*
  Generated class for the CheckoutUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-checkout-user',
    templateUrl: 'checkout-user.html',
    providers: [DatabaseService]
})
export class CheckoutUserPage {
    usersList: any;
    loadedUserList: any;
    searchUserString = '';

    close = false;
    dataReceived: boolean;
    


    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
   
        db.loadUsersInThisEntity(this.onDataLoaded.bind(this));

    }
    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.usersList = this.loadedUserList = loadedList;
        });
    }

    searchUsers() {
        this.usersList = this.db.search(this.loadedUserList, this.searchUserString, "v.fullname");
    }

    goToCheckoutUserPickedPage(user) {
        this.navCtrl.push(CheckoutReturnDatePage, { user: user });
    }


}

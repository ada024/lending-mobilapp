import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { CheckoutUserPickedPage } from '../checkout-user-picked/checkout-user-picked';

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


    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {

        db.loadUsers(this.onDataLoaded.bind(this));
            }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutUserPage');
    }

    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.usersList = this.loadedUserList = loadedList;
        });
    }

    searchUsers() {
        this.usersList = this.db.search(this.loadedUserList, this.searchUserString, "v.name");
    }

    goToCheckoutUserPickedPage(user) {
        this.navCtrl.push(CheckoutUserPickedPage, { user: user });
        }
}

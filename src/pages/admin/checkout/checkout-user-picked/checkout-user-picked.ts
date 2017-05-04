import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { HomeAdminPage } from '../../home-admin/home-admin';
import { Toast } from 'ionic-native';
import { Loan } from '../../../../app/models/loan';
import { CheckoutAwaitingConfirmationPage } from '../checkout-awaiting-confirmation/checkout-awaiting-confirmation';

declare var window: any;

/*
  Generated class for the CheckoutUserPicked page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-checkout-user-picked',
    templateUrl: 'checkout-user-picked.html'
})
export class CheckoutUserPickedPage {
    item: any;
    user: any;

    itemListShow
    itemList: any;
    itemRef: any;
    returnDate: any;
    formattedReturnDate: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private platform: Platform, public zone: NgZone) {
        this.user = navParams.get('user');
        this.returnDate = navParams.get("event");
		this.itemList = db.getTemporaryItems();

        var year = this.returnDate.getFullYear();
        var month = this.returnDate.getMonth() + 1;
        var monthAsText = this.getMonthAsText(month);
        var date = this.returnDate.getDate();
        var suffix = this.getDayOfMonthSuffix(date);
        this.formattedReturnDate = date + suffix + " of " + monthAsText + " " + year;

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutUserPickedPage');
    }
	

    goToHomeAdminPage() {

        var loan = new Loan(this.user.uid, this.db.currentUser.fullname, this.formattedReturnDate, this.returnDate.getTime());
        for (let item of this.itemList) {
            this.db.addPendingLoan(loan, item.$key);
        }
        this.navCtrl.push(CheckoutAwaitingConfirmationPage, { user: this.user, formattedDate: this.formattedReturnDate});
    }

    getDayOfMonthSuffix(n) {
        if (n >= 11 && n <= 13) {
            return "th";
        }
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    getMonthAsText(n) {
        switch (n) {
            case 1: return "January";
            case 2: return "February";
            case 3: return "March";
            case 4: return "April";
            case 5: return "May";
            case 6: return "June";
            case 7: return "July";
            case 8: return "August";
            case 9: return "September";
            case 10: return "October";
            case 11: return "November";
            case 12: return "December";
        }
    }

      
    
}

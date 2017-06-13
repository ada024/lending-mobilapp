import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, Platform } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { Loan } from '../../../../app/models/loan';
import { CheckoutAwaitingConfirmationPage } from '../checkout-awaiting-confirmation/checkout-awaiting-confirmation';

declare var window: any;


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
    formattedShortReturnDate: any;
    returnText;
    today;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService,
    private platform: Platform, public zone: NgZone, public alertCtrl: AlertController) {
        this.user = navParams.get('user');
        this.returnDate = navParams.get("event");
		this.itemList = db.getTemporaryItems();

        var year = this.returnDate.getFullYear();
        var month = this.returnDate.getMonth() + 1;
        var monthAsText = this.getMonthAsText(month);
        var date = this.returnDate.getDate();
        var suffix = this.getDayOfMonthSuffix(date);
        this.formattedReturnDate = date + suffix + " of " + monthAsText + " " + year;
        this.formattedShortReturnDate = date + suffix + " of " + monthAsText;

    }


    checkIfReserved() {
        var isNotReserved = true;
        var noReservations = true;
        var numberOfRes = 0;
        var numberOfAnswer = 0;
        var reservedByOthers = [];
        this.today = new Date();
        this.today.setHours(0o0,0o0,0o0,0o0);
        console.log("todayInCheck: " + this.today.getTime());
         console.log("Check: real returnDate: " + this.returnDate + " returnDateInDelete: " + this.returnDate.getTime());
        for(var item of this.itemList){
            if(item.reserved!=null){
                for(var reservation of item.reserved){
  if(reservation.pickupDate<=this.today.getTime() && reservation.returnDate>=this.today.getTime() || reservation.pickupDate<=this.returnDate.getTime() && reservation.returnDate>=this.returnDate.getTime() || this.today.getTime()<=reservation.pickupDate && this.returnDate.getTime()>=reservation.returnDate){
                        if(reservation.userId!=this.user.uid){
                            reservedByOthers.push(reservation);
                        }
                            }
                }
            }
        }

       if(reservedByOthers.length!=0){
            this.returnText = " ";
           for(var reservation of reservedByOthers){
            this.returnText+=  "<br> '" + reservation.itemName + "' is reserved by " + reservation.userName + " from " + reservation.formattedShortpUpDate + " to " + reservation.formattedShortRetDate + "<br>";
           }
                var newAlertCtrl = this.alertCtrl.create({
                        title: 'This loan overlap reservations',
                        message: this.returnText + "<br> <b>Do you want to check out these items anyway?<b>",
                        buttons: [
                         {
                        text: 'No',
                        handler: () => {
                            this.navCtrl.popToRoot();
                            }
                                },
                            {
                             text: 'Yes',
                            handler: () => {
                                this.deleteReservations();
                            }

        }
        ]
    }).present();
            } else(this.confirmPressed())

        }

        deleteReservations(){
                            var newAlertCtrl = this.alertCtrl.create({
                        title: 'Do you also want to delete these reservations?',
                        message: this.returnText,
                        buttons: [
                         {
                        text: 'No',
                        handler: () => {
                            }
                                },
                            {
                             text: 'Yes',
                            handler: () => {
                                 for(var item of this.itemList){
                                if(item.reserved!=null){
                                    var deleteReservations = [];
                                for(var reservation of item.reserved){
                                    console.log("formatted respickup" + reservation.formattedShortpUpDate + " resPickup: " + reservation.pickupDate + " formatted returnDate " + reservation.formattedShortRetDate + " resReturnDate " + reservation.returnDate);
                            if(reservation.pickupDate<=this.today.getTime() && reservation.returnDate>=this.today.getTime() || reservation.pickupDate<=this.returnDate.getTime() && reservation.returnDate>=this.returnDate.getTime() || this.today.getTime()<=reservation.pickupDate && this.returnDate.getTime()>=reservation.returnDate){
                            if(reservation.userId!=this.user.uid){
                             var index = item.reserved.indexOf(reservation);
                             console.log("sletter reservasjon med pUpDate: " + reservation.formattedShortpUpDate);
                             deleteReservations.push(reservation);
                        }
                     }
                 }
            for(var reservation of deleteReservations){
                var index = item.reserved.indexOf(reservation);
               if (item.reserved.length > -1) {
                   console.log("itemResLength before splice: " + item.reserved.length);
                                item.reserved.splice(index, 1);
                   console.log("itemResLength after splice: " + item.reserved.length);
               }
            }
            this.db.addReservation(item.reserved, item);
            }

        }

                            }

        }
        ]
    }).present();

    this.confirmPressed();
        }


    confirmPressed(){
          var userEmail = null;
        if(this.user.email!=null){
            userEmail = this.user.email;
        }
    var loan = new Loan(this.db.currentUser.entityName, this.user.photoURL, userEmail, this.user.uid, this.user.fullname, this.db.currentUser.fullname, this.formattedReturnDate, this.formattedShortReturnDate, this.returnDate.getTime());
        for (let item of this.itemList) {
            this.db.addPendingLoan(loan, item.$key);
        }
        this.navCtrl.push(CheckoutAwaitingConfirmationPage, { user: this.user, formattedDate: this.formattedReturnDate})
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

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ItemConfirmPickup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-confirm-pickup',
  templateUrl: 'item-confirm-pickup.html'
})
export class ItemConfirmPickupPage {
    eventDate: any;
    item: any;
    pickupDate: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.eventDate = navParams.get("event");
        this.item = navParams.get("item");
        var year = this.eventDate.getFullYear();
        var month = this.eventDate.getMonth()+1;
        var monthAsText = this.getMonthAsText(month);
        var date = this.eventDate.getDate();
        console.log("date after addition: " + date + "date before addition: " + this.eventDate.getUTCDate());
        var suffix = this.getDayOfMonthSuffix(date);
        this.pickupDate = date + suffix + " of " + monthAsText + " " + year;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemConfirmPickupPage');
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

  cancelClicked() {
      this.navCtrl.remove(2, 5);
      this.navCtrl.pop();
  }

  confirmClicked() {

  }

}

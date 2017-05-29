import { Component } from '@angular/core';
import { NavController, NavParams, Platform  } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

import { Toast } from 'ionic-native';

/*
  Generated class for the ItemConfirmConfirmPickup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-confirm-confirm-pickup',
  templateUrl: 'item-confirm-confirm-pickup.html'
})
export class ItemConfirmConfirmPickupPage {
     eventDate: any;
    item: any;
    returnDate: any;
    currentEntity: any;
    officeLocation: any;
    officeRoom: any;
    officeHours: any;
    officeDays: any;
    reservation:any;

    pUpDate;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private platform: Platform) {
        this.reservation = navParams.get("reservation");
        this.currentEntity = navParams.get("entity");
        this.item=navParams.get("item");
        this.officeLocation = this.currentEntity.office.location;
        this.officeRoom = this.currentEntity.office.room;
        this.officeHours = this.currentEntity.office.hours;
        this.officeDays = this.getWeekDays(this.currentEntity.office.days.length);

        this.returnDate = this.reservation.formattedRetDate;
        this.pUpDate = this.reservation.formattedpUpDate;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemConfirmPickupPage');
  }


  getWeekDays(n) {
      var weekday = new Array(7);
      weekday[0] = "Sundays";
      weekday[1] = "Mondays";
      weekday[2] = "Tuesdays";
      weekday[3] = "Wednesdays";
      weekday[4] = "Thursdays";
      weekday[5] = "Fridays";
      weekday[6] = "Saturdays";

      var days = this.currentEntity.office.days;

      var dayInfo = null;
      if (n == 1) {
          dayInfo = weekday[days[0]];
      }
      if (n == 2) {
          dayInfo = weekday[days[0]] + " and " +  weekday[days[1]];
      }
      if (n == 3) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + " and " + weekday[days[2]];
      }
      if (n == 4) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + ", " + weekday[days[2]] + " and " + weekday[days[3]];
      }
      if (n == 5) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + ", " + weekday[days[2]] + ", " + weekday[days[3]] + " and " + weekday[days[4]];
      }
      if (n == 6) {
          dayInfo = weekday[days[0]] + ", " + weekday[days[1]] + ", " + weekday[days[2]] + ", " + weekday[days[3]] + ", " + weekday[days[4]] + " and " + weekday[days[5]];
      }
      if (n == 7) {
          dayInfo = "Everyday"
      }

      return dayInfo;
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


 
  okClicked() {
    
      if (this.platform.is('cordova')) {
          this.showToast("You have reserved " + this.item.name, "center");
      }
      this.navCtrl.popToRoot();
      
  }

  showToast(message, position) {
      this.platform.ready().then(() => Toast.show(message, "long", position).subscribe(
          toast => {
              console.log(toast);
          }
      ));
  }


}

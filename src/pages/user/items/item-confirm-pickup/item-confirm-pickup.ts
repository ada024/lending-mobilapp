import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Reservation } from '../../../../app/models/reservation';
import { DatabaseService } from '../../../../providers/database-service';
import { Toast } from 'ionic-native';
import {ItemConfirmConfirmPickupPage} from '../item-confirm-confirm-pickup/item-confirm-confirm-pickup';


@Component({
  selector: 'page-item-confirm-pickup',
  templateUrl: 'item-confirm-pickup.html'
})
export class ItemConfirmPickupPage {
    eventDate: any;
    item: any;
    pickupDate: any;
    shortPickupDate: any;
    currentEntity: any;
    officeLocation: any;
    officeRoom: any;
    officeHours: any;
    officeDays: any;
    additionDaysToRes;

    returnDate: Date;
    formattedReturnDate:any;
    formattedShortReturnDate:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.eventDate = navParams.get("event");
        this.item = navParams.get("item");
        this.currentEntity = navParams.get("entity");
        this.additionDaysToRes = navParams.get("additionDaysToRes");
        this.officeLocation = this.currentEntity.office.location;
        this.officeRoom = this.currentEntity.office.room;
        this.officeHours = this.currentEntity.office.hours;
        this.officeDays = this.getWeekDays(this.currentEntity.office.days.length);

        var year = this.eventDate.getFullYear();
        var month = this.eventDate.getMonth()+1;
        var monthAsText = this.getMonthAsText(month);
        var date = this.eventDate.getDate();
        var suffix = this.getDayOfMonthSuffix(date);
        this.pickupDate = date + suffix + " of " + monthAsText + " " + year;
        this.shortPickupDate = date + suffix + " of " + monthAsText;

        var x = this.additionDaysToRes;
        var resDays = +x;
        this.returnDate = new Date(this.eventDate);
        this.returnDate.setDate(this.returnDate.getDate() + resDays);

        var year2 = this.returnDate.getFullYear();
        var month2 = this.returnDate.getMonth()+1;
        var monthAsText2 = this.getMonthAsText(month2);
        var date2 = this.returnDate.getDate();
        var suffix2 = this.getDayOfMonthSuffix(date2);
        this.formattedReturnDate = date2 + suffix2 + " of " + monthAsText2 + " " + year2;
        this.formattedShortReturnDate = date2 + suffix2 + " of " + monthAsText2;;
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


  cancelClicked() {
      this.navCtrl.remove(2, 4);
      this.navCtrl.pop();
  }

  confirmClicked() {
      var photoURL = null;
      var userEmail = null;
      if(this.item.photoURL!=null){
      photoURL = this.item.photoURL;
    }

    if(this.db.currentUser.email!=null){
      userEmail = this.db.currentUser.email;
    }
    
      var reservation = new Reservation(this.db.currentUser.entityName, this.db.currentUser.photoURL, userEmail, this.item.$key,this.db.currentUser.uid, this.db.currentUser.fullname, this.eventDate.getTime(), this.pickupDate, this.shortPickupDate, this.returnDate.getTime(), this.formattedReturnDate, this.formattedShortReturnDate, this.item.name, photoURL);
     
 var resList = [];
       if(this.item.reserved!=null){
        resList = this.item.reserved;
    }
     resList.push(reservation);
      this.db.addReservation(resList, this.item);
      

      this.navCtrl.push(ItemConfirmConfirmPickupPage, {reservation:reservation, entity:this.currentEntity, item:this.item});
  }


}

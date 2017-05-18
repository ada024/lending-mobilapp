import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { CheckoutUserPickedPage } from '../checkout-user-picked/checkout-user-picked';
/*
  Generated class for the CheckoutReturnDate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-return-date',
  templateUrl: 'checkout-return-date.html'
})
export class CheckoutReturnDatePage {
    eventSource;
    viewTitle;
    isToday: boolean;
    loadedFirstTime: boolean;
	currentEntity;

    item: any;
    user: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public ngCal: NgCalendarModule) {
        this.item = navParams.get("item");
        this.user = navParams.get("user");
		this.currentEntity = navParams.get("entity");
        this.loadedFirstTime = false;


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ItemCalendarUserPage');
    }

    calendar = {
        mode: 'month',
        currentDate: new Date(),
    }; // these are the variable used by the calendar.

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);

    }
    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        if (this.loadedFirstTime) {
            this.navCtrl.push(CheckoutUserPickedPage, { event: event, item: this.item, user:this.user });
        }
        this.loadedFirstTime = true;
    }

    nextMonth() {
        this.loadedFirstTime = false;
        this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() + 1));

    }
    previousMonth() {
        this.loadedFirstTime = false;
        this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() - 1));
    }

    swipeEvent() {
        this.loadedFirstTime = false;
    }

    createRandomEvents() {
       
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date: Date) => {
 var officeDays = this.currentEntity.office.days;
          var current = new Date();
          current.setHours(0, 0, 0);

          if (officeDays.length == 1) {
          return date.getDay() != officeDays[0] || date < current;
      }
          if (officeDays.length == 2) {
          return date.getDay() != officeDays[0] && date.getDay() != officeDays[1] || date < current
      }
          if (officeDays.length == 3) {
          return date.getDay() != officeDays[0] && date.getDay() != officeDays[1] && date.getDay() != officeDays[2] || date < current;
      }
          if (officeDays.length == 4) {
          return date.getDay() != officeDays[0] && date.getDay() != officeDays[1] && date.getDay() != officeDays[2] && date.getDay() != officeDays[3] || date < current;
      }
          if (officeDays.length == 5) {
          return date.getDay() != officeDays[0] && date.getDay() != officeDays[1] && date.getDay() != officeDays[2] && date.getDay() != officeDays[3] && date.getDay() != officeDays[4]|| date < current;
      }
          if (officeDays.length == 6) {
          return date.getDay() != officeDays[0] && date.getDay() != officeDays[1] && date.getDay() != officeDays[2] && date.getDay() != officeDays[3] && date.getDay() != officeDays[4] && date.getDay() != officeDays[5] || date < current;
      }
          if (officeDays.length == 7) {
          return date.getDay() != officeDays[0] && date.getDay() != officeDays[1] && date.getDay() != officeDays[2] && date.getDay() != officeDays[3] && date.getDay() != officeDays[4] && date.getDay() != officeDays[5] && date.getDay() != officeDays[6] || date < current;
      }
      else { return date < current; }
    

    }
}

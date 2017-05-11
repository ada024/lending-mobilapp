import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { ItemConfirmPickupPage } from '../item-confirm-pickup/item-confirm-pickup';
import { DatabaseService } from '../../../../providers/database-service';

/*
  Generated class for the ItemCalendarUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-calendar-user',
  templateUrl: 'item-calendar-user.html'
})
export class ItemCalendarUserPage {
    eventSource;
    viewTitle;
    isToday: boolean;
    loadedFirstTime: boolean;
    currentEntity;
    openingInfo;
    selectedDay;
    item: any;
    clickedTwice:boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public ngCal: NgCalendarModule, public db: DatabaseService, public zone: NgZone) {
        this.item = navParams.get("item");
        this.loadedFirstTime = false;
        this.currentEntity = navParams.get("entity");
        this.openingInfo = "Opening hours: " + this.currentEntity.office.hours;
        this.loadEvents();

       

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
      var newDay=event;
      
      if(newDay==this.selectedDay){
          this.clickedTwice=true;
      }
      this.selectedDay=newDay;
      this.isToday = today.getTime() === event.getTime();
      if (this.clickedTwice) {
          this.clickedTwice = false;
          this.navCtrl.push(ItemConfirmPickupPage, { event: event, item: this.item, entity: this.currentEntity });
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
    
  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

   createRandomEvents() {
        var events = [];
        var reservations = [];
        if(this.item.reserved!=null){
             reservations = this.db.getReservations(this.item);
        }
        console.log("reservationslength: " + reservations.length);
        //console.log("reservationsitem1: " + this.item.reserved.formattedpUpDate);
        if(reservations!=null){
            console.log("reservasjonskalender");
        for(var reservation of reservations) {
            console.log("reservasjonstid: " + reservation.pickupDate);
            var startDate = new Date();
            startDate.setTime(reservation.pickupDate);
            var endDate = new Date();
            endDate.setTime(reservation.returnDate);
            var startTime;
            var endTime;
                startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1);
               
                endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);
                events.push({
                    title: 'Reserved',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            
        }
        return events;
    }
   }
   
  markDisabled = (date: Date) => {
    
      var officeDays = this.currentEntity.office.days;
          var current = new Date();
          current.setHours(0, 0, 0);
          if(this.item.reserved!=null){
              var startDate = new Date().setTime(this.item.reserved.pickupDate);
              var endDate = new Date().setTime(this.item.reserved.returnDate);
          }

          if (officeDays.length == 1) {
          return date.getDay() != officeDays[0] || date < current;
      }
          if (officeDays.length == 2) {
          return this.eventSource && date.getDay() != officeDays[0] && date.getDay() != officeDays[1] || date < current
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
    
  };
  

}





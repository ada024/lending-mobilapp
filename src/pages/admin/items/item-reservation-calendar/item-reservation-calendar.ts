import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { ItemConfirmPickupPage } from '../item-confirm-pickup/item-confirm-pickup';
import { DatabaseService } from '../../../../providers/database-service';
/*
  Generated class for the ItemReservationCalendar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-reservation-calendar',
  templateUrl: 'item-reservation-calendar.html'
})
export class ItemReservationCalendarPage {
 eventSource;
    viewTitle;
    isToday: boolean;
    loadedFirstTime: boolean;
    currentEntity;
    openingInfo;
    selectedDay;
    item: any;
    clickedTwice:boolean;
    unableForReservation = false;
    reservationName;

    notClickable=[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public ngCal: NgCalendarModule, public db: DatabaseService, public zone: NgZone) {
        this.item = navParams.get("item");
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
      for(var reservation of this.item.reserved){
        if(reservation.pickupDate<=ev.selectedTime.getTime() && reservation.returnDate>=ev.selectedTime.getTime()){
      this.reservationName=reservation.userName;
      break;
        }
        else this.reservationName=null;
      }

      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);

  }
  onCurrentDateChanged(event: Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      var newDay= new Date(event);
      
     
     
      this.selectedDay=new Date(newDay);
      this.isToday = today.getTime() === event.getTime();
     
    
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
             reservations = this.item.reserved;
        }
        if(reservations!=null){
        for(var reservation of reservations) {
            var startDate = new Date();
            startDate.setTime(reservation.pickupDate);
            var endDate = new Date();
            endDate.setTime(reservation.returnDate);
            
            var startTime;
            var endTime;
                startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1);
               
                endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);
               
                events.push({
                    title: ' ',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    resName:reservation.userName
                });
        }
            
        }
        return events;
    }
   
   
  markDisabled = (date: Date) => {
    
      
  };

  
 
}
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { ItemConfirmPickupPage } from '../item-confirm-pickup/item-confirm-pickup';
import { DatabaseService } from '../../../../providers/database-service';


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
    unableForReservation = false;
	clickedFirstTime: boolean;
    swipeOrChangeMonth = false;
    additionDaysToRes;
    datesPicked;

    notClickable=[];
    tooShortDistance = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public ngCal: NgCalendarModule, public db: DatabaseService, public zone: NgZone) {
        this.item = navParams.get("item");
        this.loadedFirstTime = false;
        this.currentEntity = navParams.get("entity");
        this.openingInfo = "Opening hours: " + this.currentEntity.office.hours;
        this.loadEvents(null);
		this.clickedFirstTime=true;
       

    }
      
  

  calendar = {
      mode: 'month',
      currentDate: new Date(),
  }; // these are the variable used by the calendar.

 loadEvents(event: Date) {
	 var date = new Date();
	 date = event;
        this.eventSource = this.createRandomEvents(date);
    }

  onViewTitleChanged(title) {
      this.viewTitle = title;
  }
  onEventSelected(event) {
      //console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  today() {
      this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
     // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          //(ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event: Date) {
      this.loadEvents(event);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      var newDay= new Date(event);
      
      if(this.selectedDay!=null && newDay.getTime()==this.selectedDay.getTime()){
          this.clickedTwice=true;
      }
      else{
          this.clickedTwice= false;
      }
      this.selectedDay=new Date(newDay);
      this.isToday = today.getTime() === event.getTime();
      this.loadedFirstTime = true;
  }

  nextMonth() {
      this.loadedFirstTime = false;
      this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() + 1));
      this.swipeOrChangeMonth=true;
      
  }
  previousMonth() {
      this.loadedFirstTime = false;
      this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.calendar.currentDate.getMonth() - 1));
      this.swipeOrChangeMonth=true;
  }

  swipeEvent() {
      this.loadedFirstTime = false;
      this.swipeOrChangeMonth=true;
  }
    
  onRangeChanged(ev) {
      //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

   createRandomEvents(event: Date) {
    
    


       var swipeOrClick;
       if(this.swipeOrChangeMonth){
           swipeOrClick=true;
       }
       else{
           swipeOrClick=false;
       }
        var events = [];
        var reservations = [];
        if(this.item.reserved!=null){
             reservations = this.item.reserved;
        }
        if(reservations!=null){
        for(var reservation of reservations) {
            var startDate = new Date();
            startDate.setTime(reservation.pickupDate);
            this.notClickable.push(startDate);
            var endDate = new Date();
            endDate.setTime(reservation.returnDate);
            this.notClickable.push(endDate);

            for(var officeDay of this.currentEntity.office.days){
                var checkDate = new Date();
                checkDate.setTime(reservation.pickupDate);
                    var distance = officeDay - checkDate.getDay();
                checkDate.setDate(checkDate.getDate() + distance);
                      
                if(checkDate<endDate && checkDate>startDate){
                    this.notClickable.push(checkDate);
                }

                var checkDate2= new Date();
                checkDate2.setTime(reservation.returnDate);
                var distance = officeDay - checkDate2.getDay();
                checkDate2.setDate(checkDate2.getDate() + distance);

                  if(checkDate2<endDate && checkDate2>startDate){
                    this.notClickable.push(checkDate2);
                }
            }

            var startTime;
            var endTime;
                startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1);
               
                endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);
               
                events.push({
                    title: '',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true, 
                    color: 'cantBorrow'
                });
                
            
        }
        }
        if(this.item.loan!=null){
           var startDate = new Date();
            this.notClickable.push(startDate);
            var endDate = new Date();
            endDate.setTime(this.item.loan.timeInMillis);
            this.notClickable.push(endDate);

            for(var officeDay of this.currentEntity.office.days){
                var checkDate = new Date();
                    var distance = officeDay - checkDate.getDay();
                checkDate.setDate(checkDate.getDate() + distance);
                      
                if(checkDate<endDate && checkDate>startDate){
                    this.notClickable.push(checkDate);
                }

                var checkDate2= new Date();
                checkDate2.setTime(this.item.loan.timeInMillis);
                var distance = officeDay - checkDate2.getDay();
                checkDate2.setDate(checkDate2.getDate() + distance);

                  if(checkDate2<endDate && checkDate2>startDate){
                    this.notClickable.push(checkDate2);
                }
            }

            var startTime;
            var endTime;
                startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1);
               
                endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);
               
                events.push({
                    title: '',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    color: 'cantBorrow'
                });
        }

		if(event!=null && this.checkIfClickable(event, null) && !swipeOrClick && this.loadedFirstTime){
		 var startTime;
         startTime = new Date();
          startTime.setTime(event.getTime());
            var endTime;
            endTime = new Date();
         endTime.setTime(event.getTime());
		 var x = this.item.reservationDays;
        var resDays = +x;
			endTime.setDate(endTime.getDate()+resDays);
            
            var fitWithOpening = false;
            var distanceToOpening;
            for(var officeDay of this.currentEntity.office.days){
                        var newDistance;
                    newDistance = officeDay - endTime.getDay();
                    if(newDistance<0){
                        newDistance= 7-(endTime.getDay()-officeDay);
                    }
                    if(distanceToOpening==null || distanceToOpening>newDistance){
                        distanceToOpening = newDistance;
                    }
                if(endTime.getDay() == officeDay){
                    fitWithOpening=true;
                }
            }
            if(!fitWithOpening){
                endTime.setDate(endTime.getDate()+distanceToOpening);
                this.additionDaysToRes = resDays+distanceToOpening; 
            }else{this.additionDaysToRes = resDays;}

    

            if(event!=null){
   }
            if(this.checkIfClickable(event, distanceToOpening)){
                this.unableForReservation = false;
                this.datesPicked=true;
                startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()+1);
               
                endTime = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()+1);
              
                events.push({
                    title: '',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    color:'canBorrow'
                });
            }else{this.tooShortDistance.push(event); this.unableForReservation=true; }
        }else if(event!=null && !this.checkIfClickable(event, null) && this.loadedFirstTime){
            this.unableForReservation=true;
            this.datesPicked=false; 
            } else{ this.datesPicked=false;}
                startTime = null;
                endTime = null;
		 
         
         this.swipeOrChangeMonth=false;
        return events;

   }
  markDisabled = (date: Date) => {
    
      var officeDays = this.currentEntity.office.days;
          var current = new Date();
          current.setHours(0, 0, 0);
          if(this.item.reserved!=null){
              //var startDate = new Date().setTime(this.item.reserved.pickupDate);
              //var endDate = new Date().setTime(this.item.reserved.returnDate);
          }

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
    
  };

  
  checkIfClickable(date:Date, addDays){
      var isClickable = true;
      for(var clickDate of this.notClickable){
         var distance = clickDate.getTime()-date.getTime();
         var resDays;
         if(addDays!=null){
             resDays = +addDays;
             resDays += +this.item.reservationDays;
         } else resDays = this.item.reservationDays;
          var resDaysMilli = resDays*24*60*60*1000;
          if(distance<0){
          distance = 500000000000000;
        }
        date.setHours(0o0,0o0,0o0,0o0);
          if(date.getTime()==clickDate.getTime() || distance<=resDaysMilli){
          isClickable = false;
          break;
          }
      }
      return isClickable;
      
  }

   checkIfTooShortDistance(date:Date){
      var tooShortDistance = false;
      date.setHours(0o0,0o0,0o0,0o0);
      for(var clickDate of this.tooShortDistance){
         if(date.getTime()==clickDate.getTime()){
             tooShortDistance=true;
             break;
        }
    
      }
      return tooShortDistance;
      
  }

  continiueClicked(){
      if(this.checkIfClickable(this.selectedDay, null) && !this.checkIfTooShortDistance(this.selectedDay)){
          this.clickedTwice = false;
    this.navCtrl.push(ItemConfirmPickupPage, { event: this.selectedDay, item: this.item, entity: this.currentEntity, additionDaysToRes: this.additionDaysToRes });
    }
    if(this.loadedFirstTime && !this.checkIfClickable(this.selectedDay, null) || this.checkIfTooShortDistance(this.selectedDay)){
      }
  }

  resetClicked(){
      this.datesPicked = false;
      this.loadedFirstTime = false;
      var today = new Date();
      this.onCurrentDateChanged(today);
      this.loadEvents(null);
  }

}





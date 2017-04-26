import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { Reservation } from '../../../../app/models/reservation';

@Component({
  selector: 'page-items-details-admin',
  templateUrl: 'items-details-admin.html',
  providers: [DatabaseService]
})
export class ItemsDetailsAdminPage {
  modify = false;
  item;
  requesterName;
  pickupDate: any;
  formattedDate: any;
  requesterId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public events: Events) {
      var sentItem = navParams.get("item");
      this.item = db.getItemByKey(sentItem.$key);
      this.requesterName = this.item.name;

      if(this.item.reservation!=null){
       this.requesterId = this.item.reservation.userId;
      this.requesterName = db.getUsernameByUserId(this.requesterId);
      this.pickupDate = this.item.reservation.pickupDate;
      this.formattedDate = this.item.reservation.formattedDate;
      }
      if (this.item.reserved != null) {
          this.requesterId = this.item.reserved.userId;
          this.requesterName = db.getUsernameByUserId(this.requesterId);
          this.pickupDate = this.item.reserved.pickupDate;
          this.formattedDate = this.item.reserved.formattedDate;
      }

      this.events.subscribe('reservation:accepted', item => {
          this.item = db.getItemByKey(this.item.$key);
          var requesterId = this.item.reserved.userId;
          this.requesterName = this.db.getUsernameByUserId(requesterId);
          this.pickupDate = this.item.reserved.pickupDate;
          this.formattedDate = this.item.reserved.formattedDate;
      });

      this.events.subscribe('reservation:declined', item => {
          this.item = db.getItemByKey(this.item.$key);
      });
  }

  declineClicked() {
      this.db.removeReservation(this.item);
      this.events.publish('reservation:declined', this.item);
  }

  acceptClicked() {
      this.db.removeReservation(this.item);
      var reservation = new Reservation(this.requesterId, this.pickupDate, this.formattedDate);
      this.db.reservationConfirmed(this.item, reservation);
      this.events.publish('reservation:accepted', this.item);
  }
}

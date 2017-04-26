import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
      this.item = navParams.get("item");
      if(this.item.reservation!=null){
      var requesterId = this.item.reservation.userId;
      this.requesterName = db.getUsernameByUserId(requesterId);
      this.pickupDate = this.item.reservation.pickupDate;
      this.formattedDate = this.item.reservation.formattedDate;
      }
      if (this.item.reserved != null) {
          var requesterId = this.item.reserved.userId;
          this.requesterName = db.getUsernameByUserId(requesterId);
          this.pickupDate = this.item.reserved.pickupDate;
          this.formattedDate = this.item.reserved.formattedDate;
      }
  }

  declineClicked() {
      this.db.removeReservation(this.item);
  }

  acceptClicked() {
      this.db.removeReservation(this.item);
      var reservation = new Reservation(this.db.currentUser.uid, this.pickupDate, this.formattedDate);
      this.db.reservationConfirmed(this.item, reservation);
  }
}

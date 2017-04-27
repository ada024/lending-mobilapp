import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

@Component({
  selector: 'page-items-details-admin',
  templateUrl: 'items-details-admin.html',
  providers: [DatabaseService]
})
export class ItemsDetailsAdminPage {
  modify = false;
  item;
  requesterName;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService, public events: Events) {
      var sentItem = navParams.get("item");
      db.getItemForDetailsPage(this.onItemLoaded.bind(this), sentItem.$key);

      if (this.item.reservation != null) {
          this.requesterName = this.db.getUsernameByUserId(this.item.reservation.userId);
      }
      else if (this.item.reserved != null) {
          this.requesterName = this.db.getUsernameByUserId(this.item.reserved.userId);
      }

  }

  onItemLoaded(itemForDetail) {
      this.zone.run(() => {
          this.item = itemForDetail[0];
      });
      
  }


  declineClicked() {
      this.db.removeReservation(this.item);
  }

  acceptClicked() {
      var reservation = this.item.reservation;
      this.db.removeReservation(this.item);
      this.db.reservationConfirmed(this.item, reservation);
  }
}

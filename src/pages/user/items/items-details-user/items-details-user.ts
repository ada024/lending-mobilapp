import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemPickedUserPage } from '../item-picked-user/item-picked-user';


@Component({
  selector: 'page-items-details-user',
  templateUrl: 'items-details-user.html'
})
export class ItemsDetailsUserPage {
    item;
    resDays;
    reservation;
    reservationCanceled;
    itemDescription;


    constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService) {
        var sentItem = navParams.get("item");
        db.getItemForDetailsPage(this.onItemLoaded.bind(this), sentItem.$key);
        if(this.item.reserved!=null){
        var reservations = this.item.reserved;
        reservations.sort((date1,date2)=>date1.pickupDate-date1.pickupDate);
        for(var res of reservations){
            if(res.userId==db.currentUser.uid){
                this.reservation=res;
                break;
            }
        }
        }
    }


  onItemLoaded(itemForDetail) {
      this.zone.run(() => {
          if(itemForDetail[0]) {
              this.item = itemForDetail[0];
              this.resDays = this.item.reservationDays;
              this.itemDescription = this.item.description;
          }
      });

  }

  goToItemPickedPage() {
      this.navCtrl.push(ItemPickedUserPage, { item: this.item });
  }

cancelReservation(){
    var resList = [];
    resList = this.item.reserved;
    for(var res of resList){
        if(res==this.reservation){
            var index = resList.indexOf(this.reservation);
            if (resList.length > -1) {
            resList.splice(index, 1);
            this.db.addReservation(resList, this.item);
            this.reservationCanceled=true;
            break;
}
        }
    }
}
}

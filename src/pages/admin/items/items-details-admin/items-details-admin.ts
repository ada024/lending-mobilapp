import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { CheckoutConfirmItemPage } from '../../checkout/checkout-confirm-item/checkout-confirm-item';
import { ItemsAddTagScannAdminPage } from '../items-add-tag-scann-admin/items-add-tag-scann-admin';
import {ItemReservationCalendarPage} from '../item-reservation-calendar/item-reservation-calendar';

@Component({
  selector: 'page-items-details-admin',
  templateUrl: 'items-details-admin.html',
  providers: [DatabaseService]
})
export class ItemsDetailsAdminPage {
  modify = false;
  item;
  requesterName;
  resDays:any;
  modifyResDays=false;
  reservations;
  itemDescription;
  itemName;
  photoURI;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, 
  public platform: Platform, public camera: Camera, public db: DatabaseService, public events: Events) {
      let sentItem = navParams.get("item");
      this.itemDescription = sentItem.description;
      this.itemName = sentItem.name;
      db.getItemForDetailsPage(this.onItemLoaded.bind(this), sentItem.$key);
      this.resDays=this.item.reservationDays;
      
      if(this.item.reserved!=null){
          this.reservations = this.item.reserved
          this.reservations.sort((date1, date2) => date1.pickupDate - date2.pickupDate);
          console.log("resLength: "+ this.reservations.length);
      }

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

  editResDays(){
      if(this.resDays.length!=0){
    this.db.editItemResDays(this.resDays, this.item.$key);
    this.modifyResDays= false;
}
this.modifyResDays=false;
  }

  declineClicked() {
      this.db.removeReservation(this.item);
  }

  acceptClicked() {
      var reservation = this.item.reservation;
      this.db.removeReservation(this.item);
      this.db.reservationConfirmed(this.item, reservation);
  }

  cancelResClicked() {
      this.db.removeReserved(this.item);
  }

  checkout() {
      this.navCtrl.push(CheckoutConfirmItemPage, {item: this.item});
  }


  confirm() {
      this.modify = false;
      this.db.getItems().update(this.item.$key, {
          description: this.itemDescription,
          name: this.itemName
      });
      if(this.photoURI) {
          this.db.uploadImage(this.photoURI, this.item.$key);
      }
  }

  cancel() {
      this.modify = false;
      this.itemDescription = this.item.description;
      this.itemName = this.item.name;
      this.photoURI = null;
  }

  encode() {
      this.navCtrl.push(ItemsAddTagScannAdminPage, {item: this.item});
  }

  delete() {
      this.navCtrl.pop();
      this.db.deleteItem(this.item.$key);
  }

  getPicture(useCamera) {
    if(this.platform.is('cordova')) {
      var srcType;
      if(useCamera) {
        srcType = this.camera.PictureSourceType.CAMERA;
      }
      else {
        srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
      }
      var options = {
        quality: 50,
        targetHeight: 200,
        targetWidth: 200,
        sourceType: srcType,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true,
      }
      this.camera.getPicture(options).then(uri => {
          this.zone.run(() => {
              this.photoURI = "data:image/jpeg;base64," + uri;
            });
        });
    }
  }

  goToReservationCalendar(){
      this.navCtrl.push(ItemReservationCalendarPage, {item:this.item});
  }
}

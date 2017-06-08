import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { CheckoutConfirmItemPage } from '../../checkout/checkout-confirm-item/checkout-confirm-item';
import { ItemsAddTagScannAdminPage } from '../items-add-tag-scann-admin/items-add-tag-scann-admin';
import { ItemReservationCalendarPage } from '../item-reservation-calendar/item-reservation-calendar';
import { CheckinConfirmPage } from '../../checkin/checkin-confirm/checkin-confirm';

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
  newPhotoURI;
  oldPhotoURI;
  entity;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public alertCtrl: AlertController,
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
          if(!this.oldPhotoURI && this.item) {
              this.oldPhotoURI = this.item.photoURL;
          }
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
      this.db.removeTemporaryItems();
      this.navCtrl.push(CheckoutConfirmItemPage, {item: this.item});
  }

  checkin() {
      let user = this.db.getUsernameByUserId(this.item.loan.loaner);
      this.navCtrl.push(CheckinConfirmPage, {loan: this.item, user:user, self: this});
  }


  confirm() {
      this.modify = false;
      this.editResDays();
      if(this.itemDescription==null){
          this.db.getItems().update(this.item.$key, {
          description: null,
          name: this.itemName
      });
    }
    else
      this.db.getItems().update(this.item.$key, {
          description: this.itemDescription,
          name: this.itemName
      });
      if(this.newPhotoURI) {
          this.db.uploadImage(this.newPhotoURI, this.item.$key);
          this.oldPhotoURI = this.newPhotoURI = null;
      }
  }

  cancel() {
      this.modify = false;
      this.itemDescription = this.item.description;
      this.itemName = this.item.name;
      this.item.photoURL = this.oldPhotoURI;
      this.newPhotoURI = null;
  }

  encode() {
      this.navCtrl.push(ItemsAddTagScannAdminPage, {item: this.item});
  }

  cancelLoan(item) {
      this.alertCtrl.create({
      title: 'Cancel pending loan?',
      message: 'Do you want to cancel the pending loan to ' + item.pendingLoan.loanerName + '?',
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          this.db.deletePendingLoan(this.item);
        }
      }
      ]
    }).present();
  }

  delete() {
      this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete this item?',
      buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          this.navCtrl.pop();
          this.db.deleteItem(this.item.$key);
        }
      }
      ]
    }).present();
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
              this.newPhotoURI = this.item.photoURL = "data:image/jpeg;base64," + uri;
            });
        });
    }
  }

  goToReservationCalendar(){
      this.navCtrl.push(ItemReservationCalendarPage, {item:this.item});
  }
}

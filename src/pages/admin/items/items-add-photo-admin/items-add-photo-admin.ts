import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAddTagAdminPage } from '../items-add-tag-admin/items-add-tag-admin';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-items-add-photo-admin',
  templateUrl: 'items-add-photo-admin.html'
})
export class ItemsAddPhotoAdminPage {
  itemName = "";
  photoURI;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public platform: Platform, public camera: Camera) {
    this.itemName = navParams.get("itemName");
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
        targetHeight: 100,
        targetWidth: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      this.camera.getPicture(options).then(uri => {
        this.photoURI = uri;
        this.goToItemsAddTagAdminPage();
      });
    }
    else {
      this.goToItemsAddTagAdminPage();
    }
  }

  goToItemsAddTagAdminPage() {
    this.navCtrl.push(ItemsAddTagAdminPage,{itemName: this.itemName, photoURI: this.photoURI});
  }
}

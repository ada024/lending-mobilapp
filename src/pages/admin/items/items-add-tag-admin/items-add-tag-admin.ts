import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { ItemsAddTagScannAdminPage } from '../items-add-tag-scann-admin/items-add-tag-scann-admin';
import { ItemsAddSuccessAdminPage } from '../items-add-success-admin/items-add-success-admin';

@Component({
  selector: 'page-items-add-tag-admin',
  templateUrl: 'items-add-tag-admin.html'
})
export class ItemsAddTagAdminPage {
  itemName = "";
  photoURI;
  scaledPhotoURI;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public menu: DropDownMenuService, public db: DatabaseService) {
    this.itemName = navParams.get("itemName");
    let photoURI = navParams.get("photoURI");
    if(photoURI != null) {
      this.photoURI = photoURI;
      db.resizeImage(65, photoURI, uri => {
        this.scaledPhotoURI = uri;
      })
    }
  }

  goToItemsAddTagScannAdminPage(){
    this.navCtrl.push(ItemsAddTagScannAdminPage,{itemName: this.itemName, photoURI: this.photoURI});
  }

  goToItemsAddSuccessAdminPage(){
    this.navCtrl.push(ItemsAddSuccessAdminPage,{itemName: this.itemName, photoURI: this.photoURI});
  }
}

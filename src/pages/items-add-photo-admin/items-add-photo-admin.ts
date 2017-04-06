import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsAddTagAdminPage } from '../items-add-tag-admin/items-add-tag-admin';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-items-add-photo-admin',
  templateUrl: 'items-add-photo-admin.html'
})
export class ItemsAddPhotoAdminPage {
  itemName = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemName = navParams.get("itemName");

    if(!this.isAlreadyLoggedIn()){
      console.log('not login yet, redirect to login page');
      this.navCtrl.push(LoginPage);
    }

  }


  isAlreadyLoggedIn(){
    let user = window.localStorage.getItem('user');
    return user !== null &&  user !== undefined;
  }


  goToItemsAddTagAdminPage(){
    this.navCtrl.push(ItemsAddTagAdminPage,{itemName: this.itemName});
  }
}

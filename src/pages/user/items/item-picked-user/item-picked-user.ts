import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemCalendarUserPage } from '../item-calendar-user/item-calendar-user';

/*
  Generated class for the ItemPickedUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-picked-user',
  templateUrl: 'item-picked-user.html'
})
export class ItemPickedUserPage {
    item: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.item = navParams.get("item");
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPickedUserPage');
  }

  noClicked() {
      this.navCtrl.pop();
  }
  yesClicked(item) {
      this.navCtrl.push(ItemCalendarUserPage, { item: item });
  }

}

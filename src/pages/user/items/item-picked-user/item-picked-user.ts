import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemCalendarUserPage } from '../item-calendar-user/item-calendar-user';
import { DatabaseService } from '../../../../providers/database-service';


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
    hideTabBar;
    currentEntity;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
        this.item = navParams.get("item");
        this.hideTabBar = document.querySelector('#myTabs ion-navbar-section');
        db.getEntity(this.onEntityLoaded.bind(this));
    }



    onEntityLoaded(entities) {
        this.zone.run(() => {
            this.currentEntity= entities[0];
            console.log("entityname: " + this.currentEntity.name);
        });


    }
  

    ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPickedUserPage');
  }

  noClicked() {
      this.navCtrl.pop();
  }
  yesClicked(item) {
      this.navCtrl.push(ItemCalendarUserPage, { item: item, entity: this.currentEntity });
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ItemConfirmPickup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-confirm-pickup',
  templateUrl: 'item-confirm-pickup.html'
})
export class ItemConfirmPickupPage {
    eventDate: any;
    item: any;
    pickupDate: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.eventDate = navParams.get("event");
        this.item = navParams.get("item");
        var year = this.eventDate.getUTCFullYear();
        var month = this.eventDate.getUTCMonth() + 1;
        var date = this.eventDate.getUTCDate() + 1;
        this.pickupDate =  year + " " + month + " " + date;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemConfirmPickupPage');
  }

}

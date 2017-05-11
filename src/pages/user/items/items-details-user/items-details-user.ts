import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { ItemPickedUserPage } from '../item-picked-user/item-picked-user';

/*
  Generated class for the ItemsDetailsUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-items-details-user',
  templateUrl: 'items-details-user.html'
})
export class ItemsDetailsUserPage {
    item;
    resDays;


    constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService) {
        var sentItem = navParams.get("item");
        db.getItemForDetailsPage(this.onItemLoaded.bind(this), sentItem.$key);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsDetailsUserPage');
  }

  onItemLoaded(itemForDetail) {
      this.zone.run(() => {
          this.item = itemForDetail[0];
          this.resDays = this.item.reservationDays;
      });

  }

  goToItemPickedPage() {
      this.navCtrl.push(ItemPickedUserPage, { item: this.item });
  }

}

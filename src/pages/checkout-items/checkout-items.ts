import { Component } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CheckoutItems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-items',
  templateUrl: 'checkout-items.html',
  providers: [DatabaseService]
})
export class CheckoutItemsPage {
    items;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.items = db.getItems();}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemsPage');
  }
    
}

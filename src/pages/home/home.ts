import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemsPage } from '../items/items';

/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  goToItemPage() {
    this.navCtrl.push(ItemsPage);
  }

}

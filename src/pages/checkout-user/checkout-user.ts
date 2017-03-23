import { Component } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CheckoutUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-user',
  templateUrl: 'checkout-user.html',
  providers: [DatabaseService]
})
export class CheckoutUserPage {
users;

 constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.users = db.getUsers();}
		
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutUserPage');
  }

}

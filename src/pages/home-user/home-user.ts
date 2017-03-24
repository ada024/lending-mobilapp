import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';

/*
  Generated class for the HomeUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html',
  providers: [DatabaseService]
})
export class HomeUserPage {
  pendingLoans;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public db: DatabaseService) {
    this.pendingLoans = db.getPendingLoans();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUserPage');
  }

}

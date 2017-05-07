import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { SendMailPage } from '../../../send-mail/send-mail';

@Component({
  selector: 'page-users-details-admin',
  templateUrl: 'users-details-admin.html'
})
export class UsersDetailsAdminPage {
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
    this.user = navParams.get("user");
  }

  kickUser() {
    
  }
}

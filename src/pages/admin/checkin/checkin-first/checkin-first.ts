import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import { CheckinScanPage } from '../checkin-scan/checkin-scan';
import { CheckinListPage } from '../checkin-list/checkin-list';



/*
  Generated class for the CheckinFirstpage.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin-first',
  templateUrl: 'checkin-first.html',
  providers: [DatabaseService]
})
export class CheckinFirstPage {
	

	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone, private alertCtrl: AlertController, public modalCtrl: ModalController) {



    }

    goToCheckinScanPage() {
        this.navCtrl.push(CheckinScanPage);
    }

    goToCheckinListPage() {
        this.navCtrl.push(CheckinListPage);
    }


    }





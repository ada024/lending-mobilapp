import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { CheckinScanPage } from '../checkin-scan/checkin-scan';
import { CheckinListPage } from '../checkin-list/checkin-list';


@Component({
  selector: 'page-checkin-first',
  templateUrl: 'checkin-first.html',
})
export class CheckinFirstPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menu: DropDownMenuService, public db: DatabaseService) {}

    goToCheckinScanPage() {
        this.navCtrl.push(CheckinScanPage);
    }

    goToCheckinListPage() {
        this.navCtrl.push(CheckinListPage);
    }
 }





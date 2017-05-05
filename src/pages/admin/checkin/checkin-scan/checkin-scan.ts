﻿import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckinConfirmPage } from '../checkin-confirm/checkin-confirm';

/*
  Generated class for the CheckinScan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin-scan',
  templateUrl: 'checkin-scan.html'
})
export class CheckinScanPage {
    loansList: any;
    loadedItemList: any;
    searchItemString = '';


    close: boolean;
    dataReceived: boolean;
    showList: boolean;
    loan: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService) {

        if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutItemsPage');
    }


    onTagFound(nfcEvent) {
        var item;
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                item = this.db.getItemByTag(tagId);
            });
            if (item.loan != null) {
                this.close = true;
                this.goToCheckinConfirmPage(item);
            }
        }
    }

    goToCheckinConfirmPage(item) {
        var user = this.db.getUsernameByUserId(item.loan.loaner);
        this.close = true;
        this.navCtrl.push(CheckinConfirmPage, { loan: item, user: user, self: this });
    }	
}
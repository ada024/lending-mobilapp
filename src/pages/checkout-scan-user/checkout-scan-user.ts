import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TagUtil, Tag } from '../../classes/tag';
import { CheckoutUserPickedPage } from '../checkout-user-picked/checkout-user-picked';
import { DatabaseService } from '../../providers/database-service';

/*
  Generated class for the CheckoutScanUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-checkout-scan-user',
    templateUrl: 'checkout-scan-user.html',
    providers: [DatabaseService]
})
export class CheckoutScanUserPage {
    tag: Tag;
    close = false;
    dataReceived: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService) {
        this.tag = new Tag();

        if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener((tagEvent: Event) => this.tagListenerSuccess(tagEvent));
            (<any>window).nfc.addTagDiscoveredListener((tagEvent: Event) => this.tagListenerSuccess(tagEvent));
        }
    }




    tagListenerSuccess(tagEvent: Event) {
        console.log(tagEvent);
        if (!this.close) {
            this.zone.run(() => {
                this.tag = TagUtil.readTagFromJson(tagEvent);
                var tagId = (<any>window).nfc.bytesToHexString(this.tag.id);
                this.dataReceived = true;
                var user = this.db.getUserByTag(tagId);
                this.navCtrl.push(CheckoutUserPickedPage, { user: user.name });
            });
            this.close = true;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutScanUserPage');
    }

}


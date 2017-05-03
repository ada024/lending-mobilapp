import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CheckoutScanUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-scan-user',
  templateUrl: 'checkout-scan-user.html'
})
export class CheckoutScanUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutScanUserPage');
  }

        //this.tag = new Tag();
        /*
       if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
		}

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutUserPage');
    }
    
     onTagFound(nfcEvent) {
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                var user = this.db.getUserByTag(tagId);
                this.confirmUser(user);
            });
            this.close = true;
        }
    }
    */
}

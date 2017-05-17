import { Component, NgZone } from '@angular/core';
import {AlertController, NavController, NavParams } from 'ionic-angular';
import {CheckoutReturnDatePage} from '../checkout-return-date/checkout-return-date';
import { DatabaseService } from '../../../../providers/database-service';


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
    close = false;
    user;
  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService, public alertCtrl:AlertController) {

 if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutScanUserPage');
  }
        
      
	
     onTagFound(nfcEvent) {
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                this.user = this.db.getUserByTag(tagId);
                console.log("username: " + this.user.fullname);
                 if(this.user!=null){
            this.close = true;
            this.goToCheckoutUserPicked();
        }
            });
            if(this.user!=null){
            this.close = true;
        }
    }
}

    goToCheckoutUserPicked(){
        this.alertCtrl.create({
        title: 'User found',
        message: this.user.fullname,
        buttons: [
        {
            text: 'Scan again',
            handler: () => {
                this.close=false;
            }
        },
        {
            text: 'Ok',
            handler: () => {
                this.navCtrl.push(CheckoutReturnDatePage, {user:this.user});
            }
        }
        ] 
    }).present();
        
    }
    
}

import { Component, NgZone } from '@angular/core';
import {AlertController, NavController, NavParams } from 'ionic-angular';
import {CheckoutReturnDatePage} from '../checkout-return-date/checkout-return-date';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';


@Component({
  selector: 'page-checkout-scan-user',
  templateUrl: 'checkout-scan-user.html'
})
export class CheckoutScanUserPage {
    close: boolean;
    currentEntity;
  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, 
  public menu: DropDownMenuService, public db: DatabaseService, public alertCtrl:AlertController) {

db.getEntity(this.onEntityLoaded.bind(this));
 if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
  }

  onEntityLoaded(entity){
		this.currentEntity = entity[0];
	}
      
	
     onTagFound(nfcEvent) {
         var user;
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                user = this.db.getUserByTag(tagId);
                 if(user!=null){
            this.goToCheckoutUserPicked(user);
        }
            });
            if(user!=null){
            this.close = true;
        }
    }
}

    goToCheckoutUserPicked(user){
        this.alertCtrl.create({
        title: 'User found',
        message: user.fullname,
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
            this.close = true;
            this.navCtrl.push(CheckoutReturnDatePage, {user: user, entity:this.currentEntity});
            }
        }
        ] 
    }).present();
        
    }
    
}

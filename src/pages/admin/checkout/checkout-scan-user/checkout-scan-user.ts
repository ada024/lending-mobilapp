import { Component, NgZone } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {CheckoutReturnDatePage} from '../checkout-return-date/checkout-return-date';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-checkout-scan-user',
  templateUrl: 'checkout-scan-user.html'
})
export class CheckoutScanUserPage {
    close: boolean;
    currentEntity;
  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, 
  public db: DatabaseService, public alertCtrl:AlertController) {


db.getEntity(this.onEntityLoaded.bind(this));
 if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
  }

ionViewCanLeave(): boolean{
   this.close = true;
      return true;    
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
        else{
            this.noUserFound();
        }
            });
            
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

    noUserFound(){
        this.alertCtrl.create({
        title: 'No user found',
        buttons: [
        {
            text: 'Ok',
        }
        ] 
    }).present();
    }
    
}

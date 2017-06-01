import { Component, NgZone, ViewChild, } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CustomAlertPage } from '../custom-alert/custom-alert';
import { CheckoutConfirmItemPage } from '../checkout-confirm-item/checkout-confirm-item';


@Component({
  selector: 'page-checkout-scan-item',
  templateUrl: 'checkout-scan-item.html'
})
export class CheckoutScanItemPage {
    close: boolean;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams,
    public db: DatabaseService, public zone: NgZone, public modalCtrl: ModalController, private alertCtrl: AlertController) {

        

        if ((<any>window).nfc != null) {
            ((<any>window).nfc.addNdefListener(this.onTagFound.bind(this)));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
    }


ionViewCanLeave(): boolean{
   this.close = true;
      return true;    
  }

    onTagFound(nfcEvent) {
        var item;
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                item = this.db.getItemByTag(tagId);
                if (item != null && item.loan == null && item.pendingLoan == null) {
                    this.goToCheckoutConfirmItemPage(item);
                }
                if(item!=null && item.pendingLoan !=null){
                    this.itemIsPending(item);
                }

                if(item!=null && item.loan!=null){
                    this.itemAlreadyCheckedOut(item);
                }
                if(item==null){
                    this.noItemFound();
                    
                }
            });
            
        }
    }


    isThisTheRightItem(item) {
        let customAlert = this.modalCtrl.create(CustomAlertPage, { item: item });
        customAlert.onDidDismiss(data => {
            if (data != null) {
                    this.goToCheckoutConfirmItemPage(data);
            }
            else {
                this.close = false;
            }
        });
        customAlert.present();
    }
 

    itemAlreadyCheckedOut(item){
this.alertCtrl.create({
        title: item.name + ' is already checked out',
        message:"You have to check in before you can check out",
        buttons: [
        {
            text: 'Ok',
            
        }
        ] 
    }).present();
}

noItemFound(){
    this.alertCtrl.create({
        title: 'No item found',
        buttons: [
        {
            text: 'Ok',
            
        }
        ] 
    }).present();
}

itemIsPending(item){
    this.alertCtrl.create({
        title: item.name + ' is pending to ' + item.pendingLoan.loanerName,
        message:"You have to cancel pending before you can check out",
        buttons: [
        {
            text: 'Ok',
            
        }
        ] 
    }).present();
}


    goToCheckoutConfirmItemPage(item) {
             this.close=true;
            const index = this.viewCtrl.index;
            this.navCtrl.push(CheckoutConfirmItemPage, { index: index, item: item })
        
    }
}

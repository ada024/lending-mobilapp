import { Component, NgZone } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CustomAlertPage } from '../custom-alert/custom-alert';
import { CheckoutConfirmItemPage } from '../checkout-confirm-item/checkout-confirm-item';

/*
  Generated class for the CheckoutScanItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-scan-item',
  templateUrl: 'checkout-scan-item.html'
})
export class CheckoutScanItemPage {
    close: boolean;
    item: any;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone, public modalCtrl: ModalController, private alertCtrl: AlertController ) {
        if ((<any>window).nfc != null) {
            //(<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            //(<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
            ((<any>window).nfc.addNdefListener(this.onTagFound.bind(this)));
            console.log("nfc initialisert");
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutScanItemPage');
    }


    onTagFound(nfcEvent) {
        var item;
        if (!this.close) {
            this.zone.run(() => {
                console.log("nfc funnet");
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                item = this.db.getItemByTag(tagId);
                if (item != null) {
                    this.goToCheckoutConfirmItemPage(item);
                    //this.isThisTheRightItem(item);
                }
            });
            if (item != null) {
                this.close = true;
            }
        }
    }


    isThisTheRightItem(item) {
        this.item = item;
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
 

    goToCheckoutConfirmItemPage(item) {
            this.close = true;
            const index = this.viewCtrl.index;
            this.navCtrl.push(CheckoutConfirmItemPage, { index: index, item: item })
        
    }
}

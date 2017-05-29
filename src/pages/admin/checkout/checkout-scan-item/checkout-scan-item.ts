import { Component, NgZone } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { CustomAlertPage } from '../custom-alert/custom-alert';
import { CheckoutConfirmItemPage } from '../checkout-confirm-item/checkout-confirm-item';


@Component({
  selector: 'page-checkout-scan-item',
  templateUrl: 'checkout-scan-item.html'
})
export class CheckoutScanItemPage {
    close: boolean;
    item: any;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public menu: DropDownMenuService,
    public db: DatabaseService, public zone: NgZone, public modalCtrl: ModalController, private alertCtrl: AlertController ) {
        if ((<any>window).nfc != null) {
            //(<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            //(<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
            ((<any>window).nfc.addNdefListener(this.onTagFound.bind(this)));
            console.log("nfc initialisert");
        }
    }


    onTagFound(nfcEvent) {
        var item;
        if (!this.close) {
            this.zone.run(() => {
                console.log("nfc funnet");
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                item = this.db.getItemByTag(tagId);
                if (item != null && item.loan == null) {
                    this.goToCheckoutConfirmItemPage(item);
                    //this.isThisTheRightItem(item);
                }
            });
            if (item != null && item.loan == null) {
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

import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone, public modalCtrl: ModalController, private alertCtrl: AlertController ) {
        if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutScanItemPage');
    }


    onTagFound(nfcEvent) {
        var item;
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                item = this.db.getItemByTag(tagId);
                if (item != null) {
                    this.isThisTheRightItem(item);
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
                if (this.db.checkIfItemIsAdded(data)) {
                    this.alreadyAddedAlert();
                    this.close = false;
                }
                else {
                    this.goToCheckoutConfirmItemPage(data);
                }
            }
            else {
                this.close = false;
            }
        });
        customAlert.present();
    }
 
    alreadyAddedAlert() {
        let alert = this.alertCtrl.create({
            title: 'Already added',
            subTitle: 'This item is already added',
            buttons: ['Dismiss']
        });
        alert.present();
    }

    goToCheckoutConfirmItemPage(item) {
        if (this.db.checkIfItemIsAdded(item)) {
            this.alreadyAddedAlert();
        }
        else {
            this.db.addTemporaryItems(item, item.$key);
            this.close = true;
            this.navCtrl.push(CheckoutConfirmItemPage, { self: this, item: item })
        }
    }
}

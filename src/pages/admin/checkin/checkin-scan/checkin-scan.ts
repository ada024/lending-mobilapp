import { Component, NgZone } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController} from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { CheckinConfirmPage } from '../checkin-confirm/checkin-confirm';


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


    constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService, private alertCtrl: AlertController, public viewCtrl:ViewController) {
        
        
        if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
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
                 if (item!=null && item.loan != null) {
                this.goToCheckinConfirmPage(item);
            }
                if(item!=null && item.loan==null){
                    this.itemAlreadyCheckedIn(item);
                }
                if(item==null){
                    this.noItemFound();
                    
                }
            });
           
        }
    }

    goToCheckinConfirmPage(item) {
        var user = this.db.getUsernameByUserId(item.loan.loaner);
        this.close = true;
            const index = this.viewCtrl.index;
        this.navCtrl.push(CheckinConfirmPage, { loan: item, user: user, self: this, index:index});
    }	

    itemAlreadyCheckedIn(item){
    this.alertCtrl.create({
        title: item.name + ' is already checked in',
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
}

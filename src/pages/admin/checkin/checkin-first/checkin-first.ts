import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {CustomAlertCheckinPage } from '../custom-alert-checkin/custom-alert-checkin';
import {CheckinConfirmPage} from '../checkin-confirm/checkin-confirm';



/*
  Generated class for the CheckinFirstpage.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin-first',
  templateUrl: 'checkin-first.html',
  providers: [DatabaseService]
})
export class CheckinFirstPage {
	loansList: any;
	loadedItemList: any;
    searchItemString = '';
    

    close: boolean;
    dataReceived: boolean;
    showList: boolean;
	loan: any;

	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public db: DatabaseService, public zone: NgZone, private alertCtrl: AlertController, public modalCtrl: ModalController) {
        this.showList = false;
        db.loadLoansForCheckin(this.onDataLoaded.bind(this));
       

        if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
		}

    ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemsPage');
    }
  
   
    onTagFound(nfcEvent) {
        var item;
        var loan;
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                item = this.db.getItemByTag(tagId);
                loan = this.db.getLoanByItem(item);
				if(loan!=null){
			   this.isThisTheRightLoan(loan);
				}
            });
            if (loan != null) {
            this.close = true;
		}
        }
    }

  onDataLoaded(loadedList) {
      this.zone.run(() => {
          this.loansList = this.loadedItemList = loadedList;
      });
  }

  searchItems() {
          this.loansList = this.db.search(this.loadedItemList, this.searchItemString, "v.name");
   
  }

  goToCheckinConfirmPage(loan) {
     var user = this.db.getUsernameByUserId(loan.userUid);
     this.navCtrl.push(CheckinConfirmPage, {loan: loan, user: user});
		}		
	


    /*goHome() {
        this.db.removeTemporaryItems();
        this.close = true;
        this.navCtrl.pop();
    }
	*/
	
	
	isThisTheRightLoan(loan){
		this.loan = loan;
	let customAlert = this.modalCtrl.create(CustomAlertCheckinPage, {loan: loan});
	 customAlert.onDidDismiss(data => {
		 if(data!=null){
     this.goToCheckinConfirmPage(data);
		 }
		 else{
			 this.close = false;
		 }
   });
	customAlert.present();
	}
	
	
	
	/* En alert for å scanne en item som allerede ligger inne?
	alreadyAddedAlert() {
  let alert = this.alertCtrl.create({
    title: 'Already added',
    subTitle: 'This item is already added',
    buttons: ['Dismiss']
  });
  alert.present();
}
    */
	hideList(){
		this.showList = false;
	}
	
	appearList(){
		this.showList = true;
	}
	
	goHome() {
        this.navCtrl.pop();
    }
}





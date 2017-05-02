import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { HomeAdminPage } from '../../home-admin/home-admin';
import { Toast } from 'ionic-native';
import { Loan } from '../../../../app/models/loan';

declare var window: any;

/*
  Generated class for the CheckoutUserPicked page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-checkout-user-picked',
    templateUrl: 'checkout-user-picked.html',
    providers: [DatabaseService]
})
export class CheckoutUserPickedPage {
    item: any;
    user: any;

    itemListShow
    itemList: any;
    itemRef: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, private platform: Platform, public zone: NgZone) {
        this.user = navParams.get('user');
		
		db.loadTemporaryItems(this.onTemporaryLoansLoaded.bind(this));

       

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutUserPickedPage');
    }
	
	onTemporaryLoansLoaded(loadedList) {
    this.zone.run(() => {
      this.itemList = loadedList;
    });
  }

    goToHomeAdminPage() {
		if(this.platform.is('cordova')){
        this.showToast('Loan added to list. Waiting for approval from ' + this.user.fullname, 'center');
		}
		

        var loan = new Loan(this.user.uid, this.db.currentUser.fullname);
        for (let item of this.itemList) {
            this.db.addPendingLoan(loan, item.itemKey);
        }

        this.db.removeTemporaryItems();


        this.navCtrl.remove(2, 3);
        this.navCtrl.pop();
        //this.navCtrl.push(HomeAdminPage);
    }

        showToast(message, position) {
            this.platform.ready().then(() => Toast.show(message, "long", position).subscribe(
                toast => {
                    console.log(toast);
                }
            ));
        }
    
}

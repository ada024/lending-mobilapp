import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutUserPickedPage } from '../checkout-user-picked/checkout-user-picked';

/*
  Generated class for the CheckoutUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-checkout-user',
    templateUrl: 'checkout-user.html',
    providers: [DatabaseService]
})
export class CheckoutUserPage {
    usersList: any;
    loadedUserList: any;
    searchUserString = '';

    //tag: Tag;
    close = false;
    dataReceived: boolean;
    showList: boolean;


    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService, public zone: NgZone) {
        this.showList = false;
        db.loadUsersInThisEntity(this.onDataLoaded.bind(this));

        //this.tag = new Tag();
        /*
       if ((<any>window).nfc != null) {
            (<any>window).nfc.addNdefListener(this.onTagFound.bind(this));
            (<any>window).nfc.addTagDiscoveredListener(this.onTagFound.bind(this));
        }
		}

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutUserPage');
    }
    
     onTagFound(nfcEvent) {
        if (!this.close) {
            this.zone.run(() => {
                var tagId = (<any>window).nfc.bytesToHexString(nfcEvent.tag.id);
                var user = this.db.getUserByTag(tagId);
                this.confirmUser(user);
            });
            this.close = true;
        }
    }
    */
    }
    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.usersList = this.loadedUserList = loadedList;
        });
    }

    searchUsers() {
        this.usersList = this.db.search(this.loadedUserList, this.searchUserString, "v.fullname");
    }

    goToCheckoutUserPickedPage(user) {
        this.navCtrl.push(CheckoutUserPickedPage, { user: user });
    }

	hideList(){
		this.showList = false;
	}
	
	appearList(){
		this.showList = true;
	}
}

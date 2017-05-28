import { Component, NgZone } from '@angular/core';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutReturnDatePage } from '../checkout-return-date/checkout-return-date';


@Component({
    selector: 'page-checkout-user',
    templateUrl: 'checkout-user.html',
    providers: [DatabaseService]
})
export class CheckoutUserPage {
    usersList: any;
    loadedUserList: any;
    searchUserString = '';
	currentEntity;

    close = false;
    dataReceived: boolean;
    


    constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menu: DropDownMenuService, public db: DatabaseService, public zone: NgZone) {
   
        db.loadUsersInThisEntity(this.onDataLoaded.bind(this));
		db.getEntity(this.onEntityLoaded.bind(this));
    }
    onDataLoaded(loadedList) {
        this.zone.run(() => {
            this.usersList = this.loadedUserList = loadedList;
        });
    }

	
	onEntityLoaded(entity){
		this.currentEntity = entity[0];
	}
    searchUsers() {
        this.usersList = this.db.search(this.loadedUserList, this.searchUserString, "v.fullname");
    }

    goToCheckoutUserPickedPage(user) {
        this.navCtrl.push(CheckoutReturnDatePage, { user: user, entity:this.currentEntity });
    }


}

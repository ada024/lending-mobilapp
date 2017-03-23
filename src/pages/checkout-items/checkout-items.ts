import { Component } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the CheckoutItems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout-items',
  templateUrl: 'checkout-items.html',
  providers: [DatabaseService]
})
export class CheckoutItemsPage {
	itemsRef: any;
	itemsList: any;
	loadedItemList: any;
	searchItemString = '';
	

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
        this.itemsRef = firebase.database().ref('/items');
		
		this.itemsRef.on('value', itemsList => {
        let items = [];
        itemsList.forEach( item => {
         items.push(item.val());
         });

         this.itemsList = items;
         this.loadedItemList = items;
		});
		}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemsPage');
  }
  
  initializeItems(): void {
  this.itemsList = this.loadedItemList;
}
  
  searchItems(searchbar){
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = this.searchItemString;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.itemsList = this.itemsList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  console.log(q, this.itemsList.length);

}
    
}



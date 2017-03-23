import { Component } from '@angular/core';
import { DatabaseService } from '../../providers/database-service';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

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
    usersRef: any;
	usersList: any;
	loadedUserList: any;
	searchUserString = '';
	

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseService) {
        this.usersRef = firebase.database().ref('/users');
		
		this.usersRef.on('value', usersList => {
        let users = [];
        usersList.forEach( user => {
         users.push(user.val());
         });

         this.usersList = users;
         this.loadedUserList = users;
		});
		}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutItemsPage');
  }
  
  initializeUsers(): void {
  this.usersList = this.loadedUserList;
}
  
  searchUsers(searchbar){
  // Reset items back to all of the items
  this.initializeUsers();

  // set q to the value of the searchbar
  var q = this.searchUserString;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.usersList = this.usersList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  console.log(q, this.usersList.length);

}
}

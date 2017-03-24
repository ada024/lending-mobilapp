import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  pendingLoans: FirebaseListObservable<any>;
  pendingUsers: FirebaseListObservable<any>;
  
  itemsRef: any;
  itemsList: any;
  itemReturn: any;
  
  usersRef: any;
  usersList: any;
  userReturn: any;

  constructor(public http: Http, public af: AngularFire) {
    this.items = af.database.list('/items');
    this.users = af.database.list('/users');
    this.pendingLoans = af.database.list('/pendingLoans');
    this.pendingUsers = af.database.list('/pendingUsers');
	
	//maatte importere denne for aa lage en liste jeg kunne gaa igjennom for aa finne riktig id
	this.itemsRef = firebase.database().ref('/items');
	
	this.itemsRef.on('value', itemsList => {
        let itemsFire = [];
         itemsList.forEach( item => {
         itemsFire.push(item.val());
         });
		 
	   this.itemsList = itemsFire;
	   
	
  });
  
  this.usersRef = firebase.database().ref('/users');
  
  this.usersRef.on('value', usersList => {
        let usersFire = [];
         usersList.forEach( user => {
         usersFire.push(user.val());
         });
		 
	   this.usersList = usersFire;
  });
}

  
  
  addItem(name, id) {
    this.items.push({
      name: name,
      id: id
    });
  }

  getItems() {
    return this.items;
  }
  
  getItemById(id){
	  console.log("den kommer hit");
	  console.log("id her er " + id);
	  this.itemsList.forEach(item =>{
		   console.log("item.id er " + item.id);
		  if(item.id == id){
			  this.itemReturn = item;
	  }});
	  
	  return this.itemReturn;
		   }



  addUser(name) {
    this.users.push({
      name: name
    });
  }

  getUsers() {
    return this.users;
  }

  getUserByName(name){
	  this.usersList.forEach(user =>{
		  if(user.name == name){
			  this.userReturn = user;
	    }
    });
	  return this.userReturn;
	}




  addPendingUser(userId, EntityId) {
    this.pendingUsers.push({
      userId: userId,
      EntityId: EntityId
    });
  }

  getPendingUsers() {
    return this.pendingUsers;
  }





  addPendingLoan(itemId, userId) {
    this.pendingLoans.push({
      itemId: itemId,
      userId: userId
    });
  }

  getPendingLoans() {
    return this.pendingLoans;
  }

  getPendingLoansByUserId(userId){
	  //todo
	}




  populateDatabase() { 
    this.addItem("iphone lader", "1gf13gf1");
    this.addItem("android lader", "6554y5hh");
    this.addItem("camera", "876ur5htr");
    this.addUser("Daniel");
    this.addUser("Younus");
    this.addUser("Andreas");
    this.addPendingUser("John smith", "1");
    this.addPendingUser("John fisher", "1");
    this.addPendingLoan("t34g3wq4t", "Daniel");
  }

  clearDatabase() {
    this.items.remove();
    this.users.remove();
    this.pendingUsers.remove();
    this.pendingLoans.remove();
  }

}

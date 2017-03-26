import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  loans: FirebaseListObservable<any>;
  entitys: FirebaseListObservable<any>;
  pendingLoans: FirebaseListObservable<any>;
  pendingUsers: FirebaseListObservable<any>;
  pendingItems: FirebaseListObservable<any>;
  
  itemsRef: any;
  itemsList: any;
  itemReturn: any;
  
  usersRef: any;
  usersList: any;
  userReturn: any;

  constructor(public http: Http, public af: AngularFire) {
    this.items = af.database.list('/items');
    this.users = af.database.list('/users');
    this.loans = af.database.list('/loans');
    this.entitys = af.database.list('/entitys');
    this.pendingLoans = af.database.list('/pendingLoans');
    this.pendingUsers = af.database.list('/pendingUsers');
	this.pendingItems = af.database.list('/pendingItems');
	
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



  
  //Methods to add and get items
  
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
	  this.itemsList.forEach(item =>{
		  if(item.id == id){
			  this.itemReturn = item;
	  }});
	  
	  return this.itemReturn;
		   }




  //Methods to add and get users

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




  //Pending stuff

	addPendingItems(item) {
    this.pendingItems.push({
      name: item.name,
	    id: item.id
    });
    }
  
	getPendingItems(){
		return this.pendingItems;
	}
  
  addPendingLoan(item, user) {
    this.pendingLoans.push({
      itemName: item.name,
      itemId: item.id,
      userName: user.name
    });
  }
  
  getPendingLoans() {
    return this.pendingLoans;
  }

  getPendingLoansByUserId(userId){
	  //todo
	}

  addPendingUser(userId, entityId) {
    this.pendingUsers.push({
      userId: userId,
      entityId: entityId
    });
  }

  getPendingUsers() {
    return this.pendingUsers;
  }

  deletePendingLoan(pendingLoan) {
    this.pendingLoans.remove(pendingLoan);
  }




  //Methods to add and get loans

  addLoan(itemName) {
    this.loans.push({
      itemName: itemName,
    });
  }

  getLoans() {
    return this.loans;
  }




  //Methods to add and get entitys

  addEntity(entityName, owner) {
    this.entitys.push({
      entityName: entityName,
      owner: owner
    });
  }

  getEntitys() {
    return this.entitys;
  }




  //Developer tools

  populateDatabase() { 
    this.addEntity("Faculty of Art, Bergen", "Daniel");
    this.addItem("iphone lader", "1gf13gf1");
    this.addItem("android lader", "6554y5hh");
    this.addItem("camera", "876ur5htr");
    this.addUser("Daniel");
    this.addUser("Younus");
    this.addUser("Andreas");
    this.addPendingUser("John smith", "Faculty of Art, Bergen");
    this.addPendingUser("John fisher", "Faculty of Art, Bergen");
    this.addLoan("HDMI cable");
    this.addLoan("Macbook charger");
    //this.addItemToPendingLoan({name: "ipad 7", id: "324t3t43"});
    //this.addItemToPendingLoan({name: "ipad 8", id: "65745yhhh"})
  }

  clearDatabase() {
    this.entitys.remove();
    this.items.remove();
    this.users.remove();
    this.loans.remove();
    this.pendingUsers.remove();
    this.pendingLoans.remove();
  }

}

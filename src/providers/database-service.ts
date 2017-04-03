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
  temporaryItems: FirebaseListObservable<any>;
  
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
	this.temporaryItems = af.database.list('/temporaryItems');
	
	this.itemsRef = firebase.database().ref('/items');
	this.usersRef = firebase.database().ref('/users');
  
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

  loadItems(onDataLoaded){
    this.loadDataFromRef(this.itemsRef, onDataLoaded);
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

  loadUsers(onDataLoaded){
    this.loadDataFromRef(this.usersRef, onDataLoaded);
  }


  getUserByName(name){
	  this.usersList.forEach(user =>{
		  if(user.name == name){
			  this.userReturn = user;
	    }
    });
	  return this.userReturn;
	}

  addTemporaryItems(item) {
      this.temporaryItems.push({
          name: item.name,
          id: item.id
      });
  }

  getTemporaryItems() {
      return this.temporaryItems;
  }

  removeTemporaryItems() {
      this.temporaryItems.remove();
  }


  //Pending stuff


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




  //fetches firebase data and sends it to the onDataLoaded function

  loadDataFromRef(ref, onDataLoaded) {
    ref.on('value', (data) => {
      let list = [];
      data.forEach(node => {
        list.push(node.val());
        onDataLoaded(list);
      });
    });
  }




  //Searches a list

  search(loadedList, key, property){
    let list = loadedList;
    if(key) {
      list = list.filter((v) => {
      if(eval(property) && key) {
       if(eval(property).toLowerCase().indexOf(key.toLowerCase()) > -1) {
         return true;
        }
        return false;
      }
     });
    }
    return list;
  }




}

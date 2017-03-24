import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  
  itemsRef: any;
  itemsList: any;
  itemReturn: any;
  
  usersRef: any;
  usersList: any;
  userReturn: any;

  constructor(public http: Http, public af: AngularFire) {
    this.items = af.database.list('/items');
    this.users = af.database.list('/users');
	
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
		   
  getUserByName(name){
	  this.usersList.forEach(user =>{
		  if(user.name == name){
			  this.userReturn = user;
	  }});
	  
	  return this.userReturn;
		   }
		   
  
  
  addItem(name, id) {
    this.items.push({
      name: name,
      id: id
    });
  }




  getUsers() {
    return this.users;
  }

  addUser(name) {
    this.users.push({
      name: name
    });
  }




  populateDatabase() { 
    this.addItem("iphone lader", "1gf13gf1");
    this.addItem("android lader", "6554y5hh");
    this.addItem("camera", "876ur5htr");
    this.addUser("Daniel");
    this.addUser("Younus");
    this.addUser("Andreas");
  }

  clearDatabase() {
    this.items.remove();
    this.users.remove();
  }

}

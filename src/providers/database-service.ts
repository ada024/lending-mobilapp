import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, AuthProviders, FirebaseListObservable, FirebaseAuthState, AuthMethods} from 'angularfire2';
import firebase from 'firebase';
import { Observable } from "rxjs/Observable";

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { auth } from 'firebase'; //needed for the FacebookAuthProvider

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  loans: FirebaseListObservable<any>;
  entitys: FirebaseListObservable<any>;
  pendingLoans: FirebaseListObservable<any>;
  pendingUsers: FirebaseListObservable<any>;
  temporaryItems: FirebaseListObservable<any>;
  public firebase : any;
  private authState: FirebaseAuthState;
  itemsRef: any;


  usersRef: any;
  usersList: any;
  userReturn: any;

  constructor(public http: Http, public af: AngularFire, private platform: Platform) {
    this.items = af.database.list('/items');
    this.users = af.database.list('/users');
    this.loans = af.database.list('/loans');
    this.entitys = af.database.list('/entitys');
    this.pendingLoans = af.database.list('/pendingLoans');
    this.pendingUsers = af.database.list('/pendingUsers');
	this.temporaryItems = af.database.list('/temporaryItems');
	this.firebase = firebase;  //Add reference to native firebase SDK
	this.itemsRef = firebase.database().ref('/items');
	this.usersRef = firebase.database().ref('/users');

// CURREMT USER INFO
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
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
  getItem(name, id) {
      var foundItem;
      this.items.subscribe(items => {
          items.forEach(item => {
              if (item.name == name && item.id == id) {
                  foundItem = item;
                  console.log(foundItem.name);
              }
          });
      });
      return foundItem;
  }

  getItemByTag(id) {
      var foundItem;
      this.items.subscribe(items => {
          items.forEach(item => {
              if (item.id == id) {
                  foundItem = item;
              }
          });
      });
      return foundItem;
  }

  removeItem(item) {
      return this.items.remove(item);
  }

  loadItems(onDataLoaded){
    this.loadDataFromRef(this.itemsRef, onDataLoaded);
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
  getUserByTag(id) {
      var foundUser;
      this.users.subscribe(users => {
          users.forEach(user => {
              if (user.id == id) {
                  foundUser = user;
              }
          });
      });
      return foundUser;
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
  removeTemporaryItem(item) {
      this.temporaryItems.remove(item);
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


  //FACEBOOK AUTH
  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        return Facebook.login(['email', 'public_profile']).then(res => {
          const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          this.firebase.auth().signInWithCredential(facebookCredential).then(()=>{

            observer.next();
          }).catch(error => {
            //console.log(error);
            observer.error(error);
          });
        });
      } else {
        return this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then(()=>{
          observer.next();
        }).catch(error => {
          //console.log(error);
          observer.error(error);
        });
      }
    });
  }

  // FB USER INFO
  get currentUserName():string{
    return this.authState?this.authState.auth.displayName:'';
  }

  get currentUserEmail():string{
    return this.authState?this.authState.auth.email:'';
  }

  get currentUserPhotoURI():string{
    return this.authState?this.authState.auth.photoURL:'';
  }

//FACEBOOK LOGOUT
  logout() {
    this.af.auth.logout();
  }

  isLoggedIn() {
    return this.authState != null;
  }

}

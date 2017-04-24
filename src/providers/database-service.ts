import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import Rx from "rxjs/Rx"
import 'rxjs/add/operator/map';
import {AngularFire, AuthProviders, FirebaseListObservable, FirebaseAuthState, AuthMethods} from 'angularfire2';
import firebase from 'firebase';
import {Observable} from "rxjs/Observable";

import {PopoverController} from 'ionic-angular';
import {DropdownMenuPage} from '../pages/dropdown-menu/dropdown-menu';

import {Platform, ToastController} from 'ionic-angular';
import {Facebook} from 'ionic-native';
import {auth} from 'firebase'; //needed for the FacebookAuthProvider

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  loans: FirebaseListObservable<any>;
  entities: FirebaseListObservable<any>;
  pendingLoans: FirebaseListObservable<any>;
  pendingUsers: FirebaseListObservable<any>;
  usersEntityMap: FirebaseListObservable<any>;
  temporaryItems: FirebaseListObservable<any>;
  public firebase: any;
  private authState: FirebaseAuthState;
  itemsRef: any;
  entitiesRef: any;


  usersRef: any;
  usersList: any;
  userReturn: any;

  currentUser: any;

  constructor(public http: Http, public af: AngularFire, private platform: Platform,
              private  toastCtrl: ToastController, public popoverCtrl: PopoverController) {
    this.items = af.database.list('/items');
    this.users = af.database.list('/users');
    this.loans = af.database.list('/loans');
    this.entities = af.database.list('/entities');
    this.pendingLoans = af.database.list('/pendingLoans');
    this.pendingUsers = af.database.list('/pendingUsers');
    this.usersEntityMap = af.database.list('/usersEntityMap');
    this.temporaryItems = af.database.list('/temporaryItems');
    this.firebase = firebase;  //Add reference to native firebase SDK
    this.itemsRef = firebase.database().ref('/items');
    this.usersRef = firebase.database().ref('/users');
    this.entitiesRef = firebase.database().ref('/entities');


// CURREMT USER INFO
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });

    this.loadCurrentUser(currentUser => {
      this.currentUser = currentUser;
    });
  }


  //Methods to add and get items

  addItem(name, id) {
    this.items.push({
      name: name,
      id: id,
      entity: this.currentUser.entity
    });
  }

  addReservation(reservation, item) {
      this.items.update(item.$key, {
          reservation: reservation
      });
  }

  loadReservationsInThisEntity(onDataLoaded, loadedItems) {
      loadedItems.subscribe(loadedList => {
          onDataLoaded(this.search(loadedList, this!=null, "v.reservation"));
      })
  }


  removeReservation(item){
      this.items.update(item.$key, {
          reservation: null
      });
}

  getItems() {
    return this.items;
  }

  loadItems(onDataLoaded) {
    this.items.subscribe(loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.entity, "v.entity"));
    })
  }

  loadNumberOfItems(onDataLoaded) {
    Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
      return this.search(loadedItems, this.currentUser.entity, "v.entity").length;
    }).subscribe(numberOfItems => onDataLoaded(numberOfItems));
  }

  getItem(name, id) {
    let foundItem;
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

  checkIfItemIsAdded(item) {
    var foundItem = false;
    this.temporaryItems.subscribe(items => {
      items.forEach(tempItem => {
        if (tempItem.id == item.id) {
          foundItem = true;
        }
      });
    });
    //return foundItem;
    return false; // for testing (kan ikke scanne i browser)
  }


  //Methods to add and get users

  getUsers() {
    return this.users;
  }

  getUserByTag(id) {
    let foundUser;
    this.users.subscribe(users => {
      users.forEach(user => {
        if (user.id == id) {
          foundUser = user;
        }
      });
    });
    return foundUser;
  }

  loadUsers(onDataLoaded) {
    this.users.subscribe(loadedList => {
      onDataLoaded(loadedList)
    });
  }

  loadUsersInThisEntity(onDataLoaded) {
    Rx.Observable.combineLatest(this.users, this.usersEntityMap, (loadedUsers, loadedMap) => {
      let filteredMap = this.search(loadedMap, this.currentUser.entity, "v.entity");
      let users = [];
      filteredMap.forEach(element => {
        let user = this.search(loadedUsers, element.userUid, "v.uid");
        users.push(user[0]);
      });
      return users;
    }).subscribe(users => onDataLoaded(users));
  }

  getUserByName(name) {
    this.usersList.forEach(user => {
      if (user.name == name) {
        this.userReturn = user;
      }
    });
    return this.userReturn;
  }

  loadCurrentUser(onDataLoaded) {
    if (this.authState != null) {
      this.users.subscribe(users => {
        let currentUser;
        let newUser = true;
        users.forEach(user => {
          if (user.fullname == this.currentUserName) {
            currentUser = user;
            newUser = false;
          }
        });
        if (newUser) {
          this.writeDbUser(false);
        }
        onDataLoaded(currentUser);
      });
    }
  }


  addTemporaryItems(item) {
    this.temporaryItems.push({
      name: item.name,
      id: item.id,
	  userUid: this.currentUser.uid
    });
  }

  getTemporaryItems() {
    return this.temporaryItems;
  }
  
   loadTemporaryItems(onDataLoaded) {
    this.temporaryItems.subscribe(loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.uid, "v.userUid"));
    })
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
      userUid: user.uid,
      itemName: item.name,
	  itemOwnerName: this.currentUser.fullname,
      itemOwnerUid: this.currentUser.uid
    });
  }

  getPendingLoans() {
    return this.pendingLoans;
  }

  loadPendingLoans(onDataLoaded) {
    this.pendingLoans.subscribe(loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.uid, "v.userUid"));
    })
  }

  getPendingLoansByUserId(userId) {
    //todo
  }
  
  
  getUsernameByUserId(userId){
	    var foundUser;
    this.users.subscribe(users => {
      users.forEach(user => {
        if (user.uid == userId) {
          foundUser = user;
        }
      });
    });
    return foundUser;
  }
	  
	  
  

  addPendingUser(entity) {
    this.pendingUsers.push({
      userUid: this.currentUser.uid,
      fullname: this.currentUser.fullname,
      entity: entity.name
    });
  }

  getPendingUsers() {
    return this.pendingUsers;
  }

  loadPendingUsers(onDataLoaded) {
    this.pendingUsers.subscribe(loadedList => {
      onDataLoaded(loadedList);
    })
  }

  loadPendingUsersInThisEntity(onDataLoaded) {
    this.pendingUsers.subscribe(loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.entity, "v.entity"));
    })
  }

  acceptPendingUser(pendingUser) {
    this.pendingUsers.remove(pendingUser);
    this.usersEntityMap.push({
      userUid: pendingUser.userUid,
      entity: pendingUser.entity
    });
  }

  isPending(entity, onAnswerLoaded) {
    this.loadPendingUsers(loadedUsers => {
      let isPending = false;
      loadedUsers.forEach(pendingUser => {
        if(pendingUser.userUid == this.currentUser.uid && pendingUser.entity == entity.name) {
          isPending = true;
        }
      });
      onAnswerLoaded(isPending);
    });
  }

  deletePendingLoan(pendingLoan) {
    this.pendingLoans.remove(pendingLoan);
  }


  //Methods to add and get loans

  addLoan(itemName, itemOwnerName, itemOwnerUid) {
    this.loans.push({
      itemName: itemName,
      userUid: this.currentUser.uid,
	  itemOwnerName: itemOwnerName,
	  itemOwnerUid: itemOwnerUid
    });
  }

  removeLoan(loan) {
      this.loans.remove(loan);
  }

  getLoans() {
    return this.loans;
  }

  getLoanByItem(item) {
      var foundLoan;
      this.loans.subscribe(loans => {
          loans.forEach(loan => {
              if (loan.itemName == item.name) {
                  foundLoan = loan;
              }
          });
      });
      return foundLoan;
  }

  loadLoans(onDataLoaded) {
    this.loans.subscribe(loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.uid, "v.userUid"))
    });
  }

  loadLoansForCheckin(onDataLoaded) {
    this.loans.subscribe(loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.uid, "v.itemOwnerUid"))
    });
  }

  //Methods to add and get entities

  addEntity(name) {
    this.entities.push({
      name: name,
      owner: this.currentUserName
    });
  }

  getEntitys() {
    return this.entities;
  }

  loadEntities(onDataLoaded) {
    this.entities.subscribe(loadedList => {
      onDataLoaded(loadedList)
    });
  }

  loadEntitiesYouOwn(onDataLoaded) {
    this.entities.subscribe(loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.fullname, "v.owner"))
    });
  }

  loadJoinedEntities(onDataLoaded) {
    Rx.Observable.combineLatest(this.entities, this.usersEntityMap, (loadedEntities, loadedMap) => {
      let filteredMap = this.search(loadedMap, this.currentUser.uid, "v.userUid");
      let entities = [];
      filteredMap.forEach(element => {
        let entity = this.search(loadedEntities, element.entity, "v.name");
        entities.push(entity[0]);
      });
      return entities;
    }).subscribe(entities => onDataLoaded(entities));
  }

  hasJoined(entity, onAnswerLoaded) {
    this.loadUserEntityMap(loadedMap => {
      let hasJoined = false;
      loadedMap.forEach(element => {
        if(element.userUid == this.currentUser.uid && element.entity == entity.name) {
          hasJoined = true;
        }
      });
      onAnswerLoaded(hasJoined);
    });
  }

  setEntity(entity) {
    this.users.update(this.currentUser.$key, {
      entity: entity.name
    });
  }

  loadUserEntityMap(onDataLoaded){
    this.usersEntityMap.subscribe(loadedList => {
      onDataLoaded(loadedList);
    });
  }


  //Developer tools

  populateDatabase() {
    this.addItem("iphone lader", "1gf13gf1");
    this.addItem("android lader", "6554y5hh");
    this.addItem("camera", "876ur5htr");
  }

  clearDatabase() {
    this.entities.remove();
    this.items.remove();
    //this.users.remove();
    this.loans.remove();
    this.pendingUsers.remove();
    this.pendingLoans.remove();
  }


  //Searches a list

  search(loadedList, key, property) {
    let list = loadedList;
    if (key) {
      list = list.filter((v) => {
        if (eval(property) && key) {
          if (eval(property).toLowerCase().indexOf(key.toLowerCase()) > -1) {
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
      //  PHONE or BROWSER?
      if (this.platform.is('cordova')) {
        return Facebook.login(['email', 'public_profile']).then(res => {
          const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          this.firebase.auth().signInWithCredential(facebookCredential).then(() => {
            observer.next();
          }).catch(error => {
            console.log("Internal error...");
            observer.error(error);
          });
        });
        //ON BROWSER
      } else {
        return this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then(() => {
          observer.next();
        }).catch(error => {
          //console.log(error);
          observer.error(error);
        });
      }
    });
  }

  // FB USER INFO
  get currentUserName(): string {
    return this.authState ? this.authState.auth.displayName : 'no Name';
  }

  get currentUserEmail(): string {
    return this.authState ? this.authState.auth.email : 'no Email';
  }

  get currentUserPhotoURI(): string {
    return this.authState ? this.authState.auth.photoURL : 'no photo';
  }

//FACEBOOK LOGOUT
  logout() {
    this.af.auth.logout();
  }

  isLoggedIn() {
    return this.authState != null;
  }


  existInDb() {
    let userUid = this.authState.auth.uid;
    let fullUserRef = firebase.database().ref('/users/'+userUid);
    fullUserRef.once('value', (snapshot) => {
      let exist = snapshot.exists();
      this.writeDbUser(exist);
    }, function (error) {
      console.error(error);
    });
  }

  writeDbUser(exist) {
    if (!exist) {
      console.log("User added in db");
      let user = this.authState.auth;
      //splits fullname into an array
      let narr = this.authState.auth.displayName.split(" ");
      this.usersRef.child(user.uid).set({
        uid: user.uid,
        isAdmin: "false",
        isPending: "true",
        entity: "null",
        email: user.email || "",
        photoURL: user.photoURL || "",
        fullname: user.displayName || "",
        name: {
          first: narr[0] || "",
          last: narr[1] || "",
        },
      });
    } else {
      console.log("User exist in db");
    }
    this.loadCurrentUser(currentUser => {
      this.currentUser = currentUser;
    });
  }


  msgToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    return toast.present();
  }


  listPendingUsers() {
    console.log("All pending users...............");
    let pendingQuery = firebase.database().ref('/users').orderByChild("isPending").equalTo("true");
    pendingQuery.once("value")
      .then(function (snapshot) {
        let total = snapshot.numChildren();
        snapshot.forEach(function (childSnapshot) {
          let usersUid = childSnapshot.key;
          let userName = childSnapshot.child("fullname").val();
          let isPending = childSnapshot.child("isPending").val();
          let pending = isPending === "true"? 'Yes':'No';
          console.log('UserUid: '+usersUid+' Name: '+userName+' isPending: '+pending);
        });
        console.log('Total: '+total);
      });
  }


  listUsers() {
    console.log("List all users alphabetical...............");
    let userQuery = firebase.database().ref('/users').orderByKey();
    userQuery.once("value")
      .then(function (snapshot) {
        let total = snapshot.numChildren();
        snapshot.forEach(function (childSnapshot) {
          let usersUid = childSnapshot.key;
          let userName = childSnapshot.child("fullname").val();
          let entity = childSnapshot.child("entity").val();
          let isAdmin = childSnapshot.child("isAdmin").val();
          let admin = isAdmin === "true"? 'Yes' : 'No';
          console.log('Name: '+userName+' Entity: '+entity+' Admin: '+admin);
        });
        console.log('Total: '+total);
      });
  }


  //dropdown menu stuff
  openDropdownMenu(event) {
    let popover = this.popoverCtrl.create(DropdownMenuPage, {
      userName: this.currentUserName,
      logoutFunc: this.logout.bind(this)
    });
    popover.present({
      ev: event
    });
  }
}

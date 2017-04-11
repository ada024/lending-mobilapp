import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, AuthProviders, FirebaseListObservable, FirebaseAuthState, AuthMethods} from 'angularfire2';
import firebase from 'firebase';
import {Observable} from "rxjs/Observable";

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
  temporaryItems: FirebaseListObservable<any>;
  public firebase: any;
  private authState: FirebaseAuthState;
  itemsRef: any;
  entitiesRef: any;

  usersRef: any;
  usersList: any;
  userReturn: any;

  currentUser: any;

  constructor(public http: Http, public af: AngularFire, private platform: Platform, private  toastCtrl: ToastController) {
    this.items = af.database.list('/items');
    this.users = af.database.list('/users');
    this.loans = af.database.list('/loans');
    this.entities = af.database.list('/entities');
    this.pendingLoans = af.database.list('/pendingLoans');
    this.pendingUsers = af.database.list('/pendingUsers');
    this.temporaryItems = af.database.list('/temporaryItems');
    this.firebase = firebase;  //Add reference to native firebase SDK
    this.itemsRef = firebase.database().ref('/items');
    this.usersRef = firebase.database().ref('/users');
    this.entitiesRef = firebase.database().ref('/entities');


// CURREMT USER INFO
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });

    this.loadCurrentUser( currentUser => {this.currentUser = currentUser;});
}


  //Methods to add and get items

  addItem(name, id) {
    this.items.push({
      name: name,
      id: id,
      entity: this.currentUser.entity
    });
  }

  getItems() {
    return this.items;
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

  loadItems(onDataLoaded){
    this.loadDataFromRef(this.itemsRef, loadedList => {
      onDataLoaded(this.search(loadedList, this.currentUser.entity, "v.entity"));
    })
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

  addUser(name, entity) {
    this.users.push({
      name: name,
      entity: entity
    });
  }

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
    this.loadDataFromRef(this.usersRef, onDataLoaded);
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
    this.users.subscribe( users => {
      let currentUser;
      let newUser = true;
      users.forEach( user => {
        if(user.name == this.currentUserName) {
          currentUser = user;
          newUser = false;
        }
      });
      if(newUser) {
        this.addUser(this.currentUserName, "null");
        currentUser = {
          name: this.currentUserName,
          entity: "null"
        }
      }
      onDataLoaded(currentUser);
    });
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

  getPendingLoansByUserId(userId) {
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
    this.loadDataFromRef(this.entitiesRef, onDataLoaded);
  }

  // loadCurrentEntity(onDataLoaded){
  //   this.users.subscribe( users => {
  //     users.forEach( user => {
  //       if(user.name == this.currentUserName) {
  //         onDataLoaded(user.entity);
  //       }
  //     });
  //   });
  // }

  setEntity(entity) {
    this.users.update(this.currentUser.$key, {
      name: this.currentUser.name,
      entity: entity.name
    });
  }


  //Developer tools

  populateDatabase() {
    this.addEntity("Faculty of Art, Bergen");
    this.addItem("iphone lader", "1gf13gf1");
    this.addItem("android lader", "6554y5hh");
    this.addItem("camera", "876ur5htr");
    this.addPendingUser("John smith", "Faculty of Art, Bergen");
    this.addPendingUser("John fisher", "Faculty of Art, Bergen");
    this.addLoan("HDMI cable");
    this.addLoan("Macbook charger");
    //this.addItemToPendingLoan({name: "ipad 7", id: "324t3t43"});
    //this.addItemToPendingLoan({name: "ipad 8", id: "65745yhhh"})
  }

  clearDatabase() {
    this.entities.remove();
    this.items.remove();
    this.users.remove();
    this.loans.remove();
    this.pendingUsers.remove();
    this.pendingLoans.remove();
  }


  //fetches firebase data and sends it to the onDataLoaded function

  loadDataFromRef(ref, onDataLoaded) {
    ref.once('value', (snapshot) => {
      if (snapshot.val() !== null) {
        ref.on('value', (data) => {
          let list = [];
          data.forEach(node => {
            list.push(node.val());
            onDataLoaded(list);
          });
        });
      }
      else {
        onDataLoaded([]);
      }
    });
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


  writeDbUser() {
    // TODO Find a way to add user again if user is removed from db
    let existInDb;
    existInDb = JSON.parse(window.localStorage.getItem('savedExist'));
    if(existInDb==true){
      console.log("lagret exist er sann i writeIDbUser: " + existInDb)
      this.existInDb(existInDb);

    }
    this.existInDb(existInDb);
    console.log("savedExist in writeIDbUser: " + existInDb)
    if (!existInDb) {
      console.log("User added in db");
      let user = this.authState.auth;
      //splits fullname into an array
      let narr = this.authState.auth.displayName.split(" ");
      this.usersRef.child(user.uid).set({
        isAdmin: "false",
        email: user.email || "",
        photoURL: user.photoURL || "",
        fullname: user.displayName || "",
        name: {
          first: narr[0] || "",
          middle: narr[1] || "",
          last: narr[2] || "",
        },
      });
    } else {
      console.log("User exist in db");
    }
  }

  existInDb(exist) {
   // let exist: boolean;
    let user = this.authState.auth.uid;
    let usersReff = firebase.database().ref('/users');

    usersReff.child(user).once('value', function (snapshot) {
      exist = (snapshot.val() != null);
      console.log("value exist is: " + exist);
      console.log("savedExist in exisitDB: " + exist);
      window.localStorage.setItem('savedExist', JSON.stringify(exist));
    });

    // user has reinstalled app ,aka cleared localstorage
    if (exist == null) {
      usersReff.child(user).once('value', function (snapshot) {
        exist = (snapshot.val() != null);
        console.log("User has reinstall app : " + exist);
        window.localStorage.setItem('savedExist', JSON.stringify(exist));
      });
    }

// rerun check
    if (exist == false) {
      usersReff.child(user).once('value', function (snapshot) {
        exist = (snapshot.val() != null);
        console.log("User hase reinstall app : " + exist);
        window.localStorage.setItem('savedExist', JSON.stringify(exist));
      });
    }
  }

  msgToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    return toast.present();
  }

  setup() {
    this.setCurrentUser();
    this.loadUsers(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {

    let newUser = true;
    for (let i = 0; i < loadedList.length; i++) {
      if (loadedList[i].name == this.currentUserName) {
        newUser = false;
      }
    }
    if (newUser) {
      this.addUser(this.currentUserName, "null");
    }
  }
}

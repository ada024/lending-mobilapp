﻿import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import Rx from "rxjs/Rx"
import 'rxjs/add/operator/map';
import {AngularFire, AuthProviders, FirebaseListObservable, FirebaseAuthState, AuthMethods} from 'angularfire2';
import firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import {Tempitems} from '../app/models/tempItems';

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
    tempItems: Tempitems;



    usersRef: any;
    usersList: any;
    userReturn: any;

    currentUser: any;

    constructor(public http: Http, public af: AngularFire, private platform: Platform,
        private toastCtrl: ToastController) {
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
        this.tempItems = new Tempitems();

        // CURREMT USER INFO
        this.af.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
            if (state) {
                this.loadCurrentUser((currentUser) => {
                    this.currentUser = currentUser;
                });
            }
        });
    }


    //Methods to add and get items

    addItem(name, id, photoURI) {
        this.items.push({
            name: name,
            id: id,
            entity: this.currentUser.entity
        }).then((resolve) => {
            this.uploadImage(photoURI, this.currentUser.entity, name, resolve.key)
        })
    }

    addReservation(reservation, item) {
        this.items.update(item.$key, {
            reservation: reservation
        });
    }



    loadUsersReservations(onDataLoaded) {
        this.items.subscribe(itemsArray => {
            itemsArray = itemsArray.filter(item => {
                return (item.reserved != null && item.reserved.userId == this.currentUser.uid)
            });
            onDataLoaded(itemsArray)
        });
    }


    removeReservation(item) {
        this.items.update(item.$key, {
            reservation: null
        });
    }

    removeReserved(item) {
        this.items.update(item.$key, {
            reserved: null
        });
    }

    reservationConfirmed(item, reservation) {
        this.items.update(item.$key, {
            reserved: reservation
        });
    }

    getItems() {
        return this.items;
    }

    loadItems(onDataLoaded) {
        if (this.currentUser != null) {
            this.items.subscribe(loadedList => {
                onDataLoaded(this.search(loadedList, this.currentUser.entity, "v.entity"));
            })
        }
        else
            this.setCurrentUser(this.loadItems.bind(this), onDataLoaded)
    }

    getItemByKey(itemKey) {
        var foundItem;
        this.items.subscribe(items => {
            items.forEach(item => {
                if (item.$key == itemKey) {
                    foundItem = item;
                }
            });
        });
        return foundItem;
    }



    loadAvailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved == null && item.loan == null);
        }).subscribe(availableItems => onDataLoaded(availableItems));
    }

    loadUnavailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved != null || item.loan != null);
        }).subscribe(availableItems => onDataLoaded(availableItems));
    }

    loadLoanedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null);
        }).subscribe(availableItems => onDataLoaded(availableItems));
    }

    loadNumberOfUnavailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved != null || item.loan != null).length;
        }).subscribe(availableItems => onDataLoaded(availableItems));
    }

    loadNumberOfAvailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved == null && item.loan == null).length;
        }).subscribe(numberOfAvailableItems => onDataLoaded(numberOfAvailableItems));
    }

    loadNumberOfLoanedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null).length;
        }).subscribe(availableItems => onDataLoaded(availableItems));
    }

    loadReservedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved != null);
        }).subscribe(reservedItems => onDataLoaded(reservedItems));
    }

    getItemForDetailsPage(onDataLoaded, itemKey) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.$key == itemKey);
        }).subscribe(itemForDetail => onDataLoaded(itemForDetail));
    }

    loadNumberOfReservedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved != null).length;
        }).subscribe(numberOfReservedItems => onDataLoaded(numberOfReservedItems));
    }


    loadNumberOfItems(onDataLoaded) {
        if (this.currentUser != null) {
            Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
                return this.search(loadedItems, this.currentUser.entity, "v.entity").length;
            }).subscribe(numberOfItems => onDataLoaded(numberOfItems));
        }
        else
            this.setCurrentUser(this.loadNumberOfItems.bind(this), onDataLoaded)
    }

    loadNumberOfReservationRequests(onDataLoaded) {
        if (this.currentUser != null) {
            Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
                return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reservation != null).length;
            }).subscribe(numberOfReservationRequests => onDataLoaded(numberOfReservationRequests));
        }
        else
            this.setCurrentUser(this.loadNumberOfReservationRequests.bind(this), onDataLoaded)
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
                if (item.entity == this.currentUser.entity && item.id == id) {
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
        var temporaryItems = this.tempItems.getItems();
        temporaryItems.forEach(tempItem => {
                if (tempItem.$key == item.$key) {
                    foundItem = true;
                }
            });
        //return foundItem;
        return foundItem; // for testing (kan ikke scanne i browser)
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
        if (this.currentUser != null) {
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
        else {
            this.setCurrentUser(this.loadUsersInThisEntity.bind(this), onDataLoaded)
        }
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
        if (this.currentUser != null) {
            this.users.subscribe(users => {
                users.forEach(user => {
                    if (user.fullname == this.currentUserName) {
                        onDataLoaded(user)
                    }
                })
            })
        }
        else
            this.setCurrentUser(this.loadCurrentUser.bind(this), onDataLoaded)
    }

    setCurrentUser(callback, parameter) {
        this.users.subscribe(users => {
            users.forEach(user => {
                if (user.$key == this.authState.auth.uid) {
                    this.currentUser = user;
                }
            })
            callback(parameter);
        }).unsubscribe;
    }

    setUserTag(tagId) {
        return this.users.update(this.currentUser.$key, {
          tagId: tagId
      })
    }

    addTemporaryItems(item, itemKey) {
        this.tempItems.addItem(item);
    }

    getTemporaryItems() {
        return this.tempItems.getItems();
    }


    checkIfConfirmed(sentItems, onDataLoaded) {
        this.items.subscribe(items => {
            var foundItem = 0;
            for (let sItem of sentItems) {
                for (let item of items) {
                    if (item.$key == sItem.$key) {
                        if (item.loan != null) {
                            foundItem++;
                        }
                    }

                }
                }
            onDataLoaded(foundItem);
        });
               
}
   

   removeTemporaryItems() {
       this.tempItems.deleteAllItems();
  }
  

   removeTemporaryItem(item) {
       this.tempItems.deleteItem(item);
  }


  //Pending stuff

  
  addPendingLoan(loan, itemKey) {
    this.items.update(itemKey, {
       pendingLoan:loan
    });
  }

  getPendingLoans(onDataLoaded) {
      this.items.subscribe(itemsArray => {
          itemsArray = itemsArray.filter(item => {
              return (item.pendingLoan != null)
          });
          onDataLoaded(itemsArray)
      });
  }

  loadPendingLoans(onDataLoaded) {
    if(this.currentUser != null) {
        this.items.subscribe(itemsArray => {
            itemsArray = itemsArray.filter(item => {
                return (item.pendingLoan != null && item.pendingLoan.loaner == this.currentUser.uid)
            });
            onDataLoaded(itemsArray)
        });
    }
    else
      this.setCurrentUser(this.loadPendingLoans.bind(this), onDataLoaded)
  }

   
  
  getUsernameByUserId(userId) {
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
      entity: entity.name,
      photoURL: this.currentUser.photoURL
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
    if(this.currentUser != null) {
      Rx.Observable.combineLatest(this.pendingUsers, this.users, (loadedPendingUsers, loadedUsers) => {
        return this.search(loadedPendingUsers, this.currentUser.entity, "v.entity");
      }).subscribe(pendingUsersInThisEntity => onDataLoaded(pendingUsersInThisEntity));
    }
    else
      this.setCurrentUser(this.loadPendingUsersInThisEntity.bind(this), onDataLoaded)
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
      this.items.update(pendingLoan.$key, {
          pendingLoan:null
      })
  }


  //Methods to add and get loans

  addLoan(loan, item) {
      this.items.update(item.$key, {
      loan: loan
    });
  }
  


  removeLoan(loan) {
      this.items.update(loan.$key, {
          loan: null
      });
  }

  getLoans(onDataLoaded) {
      this.items.subscribe(itemsArray => {
          itemsArray = itemsArray.filter(item => {
              return (item.loan != null)
          });
          onDataLoaded(itemsArray)
      });
  }


  loadLoans(onDataLoaded) {
      if (this.currentUser != null) {
          this.items.subscribe(itemsArray => {
              itemsArray = itemsArray.filter(item => {
                  return (item.loan != null && item.loan.loaner == this.currentUser.uid)
              });
              onDataLoaded(itemsArray)
          });
      }
      else
          this.setCurrentUser(this.loadPendingLoans.bind(this), onDataLoaded)
  }

  loadLoansForCheckin(onDataLoaded) {
      if (this.currentUser != null) {
          Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
              return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null);
          }).subscribe(loansForCheckin => onDataLoaded(loansForCheckin));
      }
      else
          this.setCurrentUser(this.loadItems.bind(this), onDataLoaded)
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
    // this.addItem("iphone lader", "1gf13gf1");
    // this.addItem("android lader", "6554y5hh");
    // this.addItem("camera", "876ur5htr");
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


  //image stuff
  uploadImage(photoURI, entity, name, key) {
    if(photoURI != null) {
      firebase.storage().ref('images/' + entity + "/" + name + "-" + key)
      .putString(photoURI.split(",")[1], 'base64').then(function(snapshot) {
        this.items.update(key, {
          photoURL: snapshot.downloadURL
        });
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      }.bind(this))
    }
  }

  downloadImage(item, onDataLoaded) {
    firebase.storage().ref('images/' + item.entity + "/" + item.name + "-" + item.$key).getDownloadURL().then(url => {
      onDataLoaded(url);  
    }, ()=>{})
  }

  resizeImage(size, uri, callback) {
  var tempImg = new Image();
  tempImg.src = uri;
  tempImg.setAttribute('crossOrigin', 'anonymous');
  tempImg.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(<HTMLImageElement>this, 0, 0, tempImg.width, tempImg.height, 0, 0, size, size);
    callback(canvas.toDataURL("image/jpeg"));
    };
  }
}

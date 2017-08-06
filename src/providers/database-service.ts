import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import Rx from "rxjs/Rx"
import 'rxjs/add/operator/map';
import {
  AngularFire, AuthProviders, FirebaseListObservable, FirebaseAuthState, AuthMethods,
  AngularFireAuth
} from 'angularfire2';
import firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import {Tempitems} from '../app/models/tempItems';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

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

    // email auth
    public fireAuth: any;

    errorFunc = error => {console.log(error)};

    constructor(public http: Http, public af: AngularFire, private platform: Platform, private iap: InAppPurchase,
        private toastCtrl: ToastController, private firebaseAuth: AngularFireAuth) {
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
        this.entitiesRef = firebase.database().ref('/entities');
        this.tempItems = new Tempitems();


        // CURREMT USER INFO
        this.af.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
            if (state) {
                this.existInDb();
                this.checkReservations();
                this.updateFacebookPicture();
                this.loadCurrentUser((currentUser) => {
                    this.currentUser = currentUser;
                });
            }
        });


        // email auth
        this.fireAuth = firebase.auth();
        this.usersRef = firebase.database().ref('/users');
    }

    


    // ------------------------------------------------------------------------------------------------------------------

    /**
     * Item And Reservation
     *
     */

    checkReservations() {
        var now = new Date();
        now.setDate(now.getDate()-1);

        this.items.subscribe(items => {
            items.forEach(item => {
                if(item.reserved!=null){
                    for(var res of item.reserved){
                        if(res.pickupDate<=now.getTime()){
                            var index = item.reserved.indexOf(res);
                            if (item.reserved.length > -1) {
                                item.reserved.splice(index, 1);
                                this.addReservation(item.reserved, item);
                            }
                        }
                    }
                }
            });
        }, this.errorFunc);
    }

    addItem(name, id, photoURI, reservationDays) {
        this.items.push({
            name: name,
            id: id,
            entity: this.currentUser.entity,
            entityName: this.currentUser.entityName,
            reservationDays: reservationDays,
            status:"Available",
            reserved: null,
            description: ""
        }).then((resolve) => {
           this.uploadImage(photoURI, resolve.key)
        })
    }

    deleteItem(key) {
        this.items.remove(key);
        this.deleteImage(key);
    }

    addReservation(reservations, item) {
        this.items.update(item.$key, {
            reserved:reservations
        })
        /*
        var resRef = this.itemsRef.child(item.$key + "/reserved");

        resRef.push(reservation);
        */

    }


setNotify(item){
this.items.update(item.$key, {
status:"Notify"
}
)
}


    loadUsersReservations(onDataLoaded) {
        var now = new Date();
        now.setHours(0o0,0o0,0o0,0o0);

        this.items.subscribe(itemsArray => {
            var returnList = [];
            itemsArray = itemsArray.filter(item => {

                if(item.reserved!=null){
                    for(var reservation of item.reserved){
                        if(reservation.pickupDate<now.getTime()){
                             var index = item.reserved.indexOf(reservation, 0);
                        if (index > -1) {
                     item.reserved.splice(index, 1);
                      this.items.update(item.$key, {
                    reserved: item.reserved
                        })
                        }
                        }
                        else if(reservation.userId==this.currentUser.uid){
                        returnList.push(reservation)
                        }
                    }
                }

                });
            onDataLoaded(returnList)
            }, this.errorFunc);


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


    isReservationOutdated(){
    var now = new Date();
    now.setHours(0o0,0o0,0o0,0o0);

           this.items.subscribe(loadedList => {
               this.search(loadedList, this.currentUser.entity, "v.entity").forEach(item => {
                     if(item.reserved!=null){
                    for(var reservation of item.reserved){
                        if(reservation.pickupDate<now.getTime()){
                             var index = item.reserved.indexOf(reservation, 0);
                        if (index > -1) {
                     item.reserved.splice(index, 1);

                      this.items.update(item.$key, {
                    reserved: item.reserved
                        })
                        }
                        }
    }
                 } 
        });
           }, this.errorFunc).unsubscribe();
    }
              

    loadItems(onDataLoaded) {
        if (this.currentUser != null) {
            this.items.subscribe(loadedList => {
                onDataLoaded(this.search(loadedList, this.currentUser.entity, "v.entity"));
            }, this.errorFunc)
            
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
        }, this.errorFunc);
        return foundItem;
    }



    loadAvailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan == null);
        }).subscribe(availableItems => onDataLoaded(availableItems), this.errorFunc);
    }

    loadUnavailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null);
        }).subscribe(availableItems => onDataLoaded(availableItems), this.errorFunc);
    }

    loadLoanedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null);
        }).subscribe(availableItems => onDataLoaded(availableItems), this.errorFunc);
    }

    loadNumberOfUnavailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null).length;
        }).subscribe(availableItems => onDataLoaded(availableItems), this.errorFunc);
    }

    loadNumberOfAvailableItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan == null).length;
        }).subscribe(numberOfAvailableItems => onDataLoaded(numberOfAvailableItems), this.errorFunc);
    }

    loadNumberOfLoanedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null).length;
        }).subscribe(availableItems => onDataLoaded(availableItems), this.errorFunc);
    }

    loadReservedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved != null);
        }).subscribe(reservedItems => onDataLoaded(reservedItems), this.errorFunc);
    }

    getItemForDetailsPage(onDataLoaded, itemKey) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.$key == itemKey);
        }).subscribe(itemForDetail => onDataLoaded(itemForDetail), this.errorFunc);
    }

    loadNumberOfReservedItems(onDataLoaded) {
        Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
            return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.reserved != null).length;
        }).subscribe(numberOfReservedItems => onDataLoaded(numberOfReservedItems), this.errorFunc);
    }

    deleteOutdatedReservations(){

    }

    loadNumberOfItems(onDataLoaded) {
        if (this.currentUser != null) {
            Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
                return this.search(loadedItems, this.currentUser.entity, "v.entity").length;
            }).subscribe(numberOfItems => onDataLoaded(numberOfItems), this.errorFunc);
        }
        else
            this.setCurrentUser(this.loadNumberOfItems.bind(this), onDataLoaded)
    }

    loadNumberOfReservations(onDataLoaded) {
          /* this.items.subscribe(items=> {
               var reservations = 0;
               items.forEach(item=>{
                   if(item.entity==this.currentUser.entity && item.reserved!=null){
                    reservations+=item.reserved.length;
                   }
               });
                onDataLoaded(reservations)
           }, this.errorFunc);
           */

           this.items.subscribe(itemsArray => {


               var reservations = [];
            itemsArray = itemsArray.filter(item => {
                if(item.reserved!=null && item.entity==this.currentUser.entity){
                    for(var res of item.reserved){
                    reservations.push(res)
                    }
                        }
                });
            onDataLoaded(reservations)
            }, this.errorFunc);
        }



    getItemByTag(id) {
        var foundItem;
        this.items.subscribe(items => {
            items.forEach(item => {
                if (item.entity == this.currentUser.entity && item.id == id) {
                    foundItem = item;
                }
            });

        }, this.errorFunc);
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




    // ------------------------------------------------------------------------------------------------------------------

    /**
     * Users
     *
     */

    getUsers() {
        return this.users;
    }

    getUserByTag(id) {
        let foundUser;
        this.users.subscribe(users => {
            users.forEach(user => {
                if (user.tagId == id) {
                    foundUser = user;
                }
            });
        }, this.errorFunc);
        return foundUser;
    }

    loadUsers(onDataLoaded) {
        this.users.subscribe(loadedList => {
            onDataLoaded(loadedList)
        }, this.errorFunc);
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
            }).subscribe(users => onDataLoaded(users), this.errorFunc);
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
                    if (user.uid == this.authState.auth.uid) {
                        onDataLoaded(user)
                    }
                })
            }, this.errorFunc)
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
        }, this.errorFunc);
    }

    setUserTag(tagId) {
        return this.users.update(this.currentUser.$key, {
          tagId: tagId
      })
    }

    requestUserTag(tagId, user) {
        return this.users.update(user, {
          requestTagId: tagId
      })
    }

    declineUserTag() {
        this.users.update(this.currentUser.$key, {
          requestTagId: null
      })
    }

    acceptUserTag() {
        this.users.update(this.currentUser.$key, {
            tagId: this.currentUser.requestTagId,
            requestTagId: null
      })
    }

    setAdminRole(adminRole) {
        if(this.currentUser && !this.currentUser.adminRole) {
            this.users.update(this.currentUser.$key, {
                adminRole: adminRole,
            })
        }
        else if(this.currentUser && !this.currentUser.otherRoleEntity){
            this.users.update(this.currentUser.$key, {
                adminRole: adminRole,
                otherRoleEntity: this.currentUser.entity,
                otherRoleEntityName: this.currentUser.entityName,
                entity: "No library, join a library to get started",
                entityName: "No library, join a library to get started"
            })
        }
        else if(this.currentUser && this.currentUser.otherRoleEntity){
            this.users.update(this.currentUser.$key, {
                adminRole: adminRole,
                otherRoleEntity: this.currentUser.entity,
                otherRoleEntityName: this.currentUser.entityName,
                entity: this.currentUser.otherRoleEntity,
                entityName: this.currentUser.otherRoleEntityName
            })
        }
    }

    giveUserAdminAccess(user) {
        this.usersEntityMap.subscribe(map => {
            map.forEach(element => {
                if(element.userUid == user.uid && element.entity == this.currentUser.entity) {
                    this.usersEntityMap.update(element.$key, {
                        adminAccess: true
                    })
                }
            });
        }, this.errorFunc);
    }

    kickUser(user) {
		let key;
        this.usersEntityMap.subscribe(map => {
            map.forEach(element => {
                if(element.userUid == user.uid && element.entity == this.currentUser.entity) {
					key = element.$key;
                }
            });
        }, this.errorFunc);
		this.usersEntityMap.remove(key);
        this.users.update(user.$key, {
          entity: "No library, join a library to get started",
          entityName: "No library, join a library to get started"
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
        }, this.errorFunc);

}


   removeTemporaryItems() {
       this.tempItems.deleteAllItems();
  }


   removeTemporaryItem(item) {
       this.tempItems.deleteItem(item);
  }


      // ------------------------------------------------------------------------------------------------------------------

    /**
     * Pending Users And Pending Loans
     *
     */


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
      }, this.errorFunc);
  }

  loadPendingLoans(onDataLoaded) {
    if(this.currentUser != null) {
        this.items.subscribe(itemsArray => {
            itemsArray = itemsArray.filter(item => {
                return (item.pendingLoan != null && item.pendingLoan.loaner == this.currentUser.uid)
            });
            onDataLoaded(itemsArray)
        }, this.errorFunc);
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
    }, this.errorFunc);
    return foundUser;
  }

  getUserById(userId) {
      return new Promise((resolve) => {
          this.users.subscribe(users => {
            users.forEach(user => {
            if (user.uid == userId) {
                resolve(user);
                }
            });
        }, this.errorFunc).unsubscribe();
      });
  }




  addPendingUser(entity) {
    this.pendingUsers.push({
      userUid: this.authState.auth.uid||'authEmailUidHer',
      fullname: this.currentUser.fullname||'emailFullNameHer',
      entity: entity.$key,
      entityName: entity.name,
      email:this.authState.auth.email|| 'authForEmailHer',
      photoURL: this.currentUser.photoURL
    });
  }

  getPendingUsers() {
    return this.pendingUsers;
  }

  loadPendingUsers(onDataLoaded) {
    this.pendingUsers.subscribe(loadedList => {
      onDataLoaded(loadedList);
    }, this.errorFunc)
  }

  loadPendingUsersInThisEntity(onDataLoaded) {
    if(this.currentUser != null) {
      Rx.Observable.combineLatest(this.pendingUsers, this.users, (loadedPendingUsers, loadedUsers) => {
        return this.search(loadedPendingUsers, this.currentUser.entity, "v.entity");
      }).subscribe(pendingUsersInThisEntity => onDataLoaded(pendingUsersInThisEntity), this.errorFunc);
    }
    else
      this.setCurrentUser(this.loadPendingUsersInThisEntity.bind(this), onDataLoaded)
  }

  acceptPendingUser(pendingUser) {
    this.pendingUsers.remove(pendingUser);
    this.usersEntityMap.push({
      userUid: pendingUser.userUid,
      entity: pendingUser.entity,
      entityName: pendingUser.entityName,
      newUser: true,
      fullname: pendingUser.fullname,
      email: pendingUser.email,
      photoURL: pendingUser.photoURL
    });
  }

  declinePendingUser(pendingUser) {
    this.pendingUsers.remove(pendingUser);
  }

  isPending(entity, onAnswerLoaded) {
    this.loadPendingUsers(loadedUsers => {
      let isPending = false;
      loadedUsers.forEach(pendingUser => {
        if(pendingUser.userUid == this.currentUser.uid && pendingUser.entity == entity.$key) {
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


      // ------------------------------------------------------------------------------------------------------------------

    /**
     * Loans
     *
     */

  addLoan(loan, item) {
      this.items.update(item.$key, {
      loan: loan,
      status: "Out"
    });
  }



  removeLoan(loan) {
      this.items.update(loan.$key, {
          loan: null,
          status: "Available"
      });
  }

  getLoans(onDataLoaded) {
      this.items.subscribe(itemsArray => {
          itemsArray = itemsArray.filter(item => {
              return (item.loan != null)
          });
          onDataLoaded(itemsArray)
      }, this.errorFunc);
  }


  loadLoans(onDataLoaded) {
      if (this.currentUser != null) {
          this.items.subscribe(itemsArray => {
              itemsArray = itemsArray.filter(item => {
                  return (item.loan != null && item.loan.loaner == this.currentUser.uid)
              });
              onDataLoaded(itemsArray)
          }, this.errorFunc);
      }
      else
          this.setCurrentUser(this.loadPendingLoans.bind(this), onDataLoaded)
  }

  loadLoansForCheckin(onDataLoaded) {
      if (this.currentUser != null) {
          Rx.Observable.combineLatest(this.items, this.users, (loadedItems, loadedUsers) => {
              return this.search(loadedItems, this.currentUser.entity, "v.entity").filter(item => item.loan != null);
          }).subscribe(loansForCheckin => onDataLoaded(loansForCheckin), this.errorFunc);
      }
      else
          this.setCurrentUser(this.loadItems.bind(this), onDataLoaded)
  }




    // ------------------------------------------------------------------------------------------------------------------

    /**
     * Entity
     *
     */


  addEntity(name, office, reservationDays, termsAndConditions) {
    
    let entityPromise = this.entities.push({
      name: name,
      owner: this.currentUser.uid,
      ownerName: this.currentUser.fullname|| 'authForEmailHer',
      office: office,
      reservationDays:reservationDays,
      termsAndConditions:termsAndConditions
    });

    entityPromise.then((resolve) => {
        this.usersEntityMap.push({
            entity: resolve.key,
            entityName: name,
            adminAccess: true,
            newUser: false,
            userUid: this.authState.auth.uid||'authEmailUidHer',
            fullname: this.currentUser.fullname||'emailFullNameHer',
            email:this.authState.auth.email|| 'authForEmailHer',
            photoURL: this.currentUser.photoURL
        });
    })
    return entityPromise;
  }

updateTermsAndConditions(termsAndConditions){
    this.entities.update(this.currentUser.entity, {
        termsAndConditions:termsAndConditions
    })
}

  getEntitys() {
    return this.entities;
  }

  loadEntities(onDataLoaded) {
    this.entities.subscribe(loadedList => {
      onDataLoaded(loadedList)
    }, this.errorFunc);
  }

  loadEntitiesYouOwn(onDataLoaded) {
    Rx.Observable.combineLatest(this.entities, this.usersEntityMap, (loadedEntities, loadedMap) => {
        let filteredMap = this.search(loadedMap, this.currentUser.uid, "v.userUid");
        let entities = [];
        filteredMap.forEach(element => {
            if(element.adminAccess != null && element.adminAccess == true) {
                let entity = this.search(loadedEntities, element.entity, "v.$key");
                entities.push(entity[0]);
            }
        });
        return entities;
    }).subscribe(entities => onDataLoaded(entities), this.errorFunc);
  }

  loadJoinedEntities(onDataLoaded) {
    Rx.Observable.combineLatest(this.entities, this.usersEntityMap, (loadedEntities, loadedMap) => {
      let filteredMap = this.search(loadedMap, this.currentUser.uid, "v.userUid");
      let entities = [];
      filteredMap.forEach(element => {
        let entity = this.search(loadedEntities, element.entity, "v.$key");
        entities.push(entity[0]);
      });
      return entities;
    }).subscribe(entities => onDataLoaded(entities), this.errorFunc);
  }

  hasJoined(entity, onAnswerLoaded) {
    this.loadUserEntityMap(loadedMap => {
      let hasJoined = false;
      loadedMap.forEach(element => {
        if(element.userUid == this.currentUser.uid && element.entity == entity.$key) {
          hasJoined = true;
        }
      });
      onAnswerLoaded(hasJoined);
    });
  }


  getEntity(onDataLoaded) {
      var entityReturn;
      this.entities.subscribe(entityArray => {
          entityReturn = entityArray.filter(entity => {
              return (entity.$key == this.currentUser.entity)
          });
          onDataLoaded(entityReturn);
      }, this.errorFunc);

  }



  setEntity(entity) {
    this.users.update(this.currentUser.$key, {
        entity: entity.$key,
        entityName: entity.name
    });
  }

  loadUserEntityMap(onDataLoaded){
      if (this.currentUser != null) {
        this.usersEntityMap.subscribe(loadedList => {
            onDataLoaded(loadedList);
        }, this.errorFunc);
      }
    else
        this.setCurrentUser(this.loadUserEntityMap.bind(this), onDataLoaded)
  }

  confirmNewEntity(map) {
      this.usersEntityMap.update(map.$key, {
          newUser: null
      });
  }

editTitle(title){
    var officeRef = this.entitiesRef.child(this.currentUser.entity)
    officeRef.update({
  "name": title
});
 this.users.update(this.currentUser.$key, {
        entityName: title
    });

    if(this.currentUser.entity==this.currentUser.otherRoleEntity){
         this.users.update(this.currentUser.$key, {
        otherRoleEntityName: title
    });
    }

    this.updateEntityNameInUsersEntityMap(this.currentUser.entity, title);
    this.updateEntityNameInItems(this.currentUser.entity, title);
}

updateEntityNameInUsersEntityMap(entity, title) {
    let rows;
    this.usersEntityMap.subscribe(x => {
        rows = x;
    }, this.errorFunc).unsubscribe();

    rows.forEach(row => {
            if(row.entity == entity) {
                this.usersEntityMap.update(row, {
                    entityName: title
                })
            }
        });
  }

  updateEntityNameInItems(entity, title) {
    let rows;
    this.items.subscribe(x => {
        rows = x;
    }, this.errorFunc).unsubscribe();

    rows.forEach(row => {
            if(row.entity == entity) {
                this.items.update(row, {
                    entityName: title
                })
            
            if(row.loan!=null){
                var loanRef = this.itemsRef.child(row.$key + "/loan");
                loanRef.update({
                  entityName: title  
                })
            
            }

            if(row.reserved!=null){
                var reservations=row.reserved;
                reservations.forEach(reservation =>{
                    reservation.entityName=title;
                })
                this.items.update(row, {
                    reserved: reservations
                })
            }
            }
            });
    
  }

editLocation(location){
    var officeRef = this.entitiesRef.child(this.currentUser.entity + "/office")
    officeRef.update({
  "location": location
});
}

editRoom(room){
    var officeRef = this.entitiesRef.child(this.currentUser.entity + "/office")
    officeRef.update({
  "room": room
});
}

editDays(days){
    var officeRef = this.entitiesRef.child(this.currentUser.entity + "/office")
    officeRef.update({
  "days": days
});
}

editHours(fromHours, toHours){
    var officeRef = this.entitiesRef.child(this.currentUser.entity + "/office")
    officeRef.update({
         "fromHours": fromHours,
         "toHours": toHours  
});
}


editResDays(resdays){
    this.entities.update(this.currentUser.entity, {
        reservationDays:resdays
    });

    let itemsToEdit;
    this.items.subscribe(itemsArray => {
        itemsToEdit = itemsArray.filter(item => {return item.entity==this.currentUser.entity});
    }, this.errorFunc);

    itemsToEdit.forEach(item => {
          this.items.update(item.$key, {
                reservationDays:resdays
          });
      });
}




editItemResDays(resdays, itemKey){
    this.items.update(itemKey, {
        reservationDays: resdays
    })
}


    deleteEntity(entity) {
        this.usersEntityMap.subscribe(map => {
            let elementsToDelete = map.filter(el => {return (el.entity == entity.$key)});
            elementsToDelete.forEach(el => {
                 this.usersEntityMap.remove(el);
            });
        }, this.errorFunc).unsubscribe();

        this.users.subscribe(users => {
            users.forEach(user => {
                if(user.entity == entity.$key) {
                    this.users.update(user, {
                        entity: "No library, join a library to get started",
                        entityName: "No library, join a library to get started"
                    })
                }
                if(user.otherRoleEntity == entity.$key) {
                    this.users.update(user, {
                        otherRoleEntity: "No library, join a library to get started",
                        otherRoleEntityName: "No library, join a library to get started"
                    })
                }
            });
        }, this.errorFunc).unsubscribe();

        this.items.subscribe(items => {
            let itemsToDelete = items.filter(item => {return (item.entity == entity.$key)});
            itemsToDelete.forEach(item => {
                this.items.remove(item);
            });
        }, this.errorFunc).unsubscribe();

        this.entities.remove(entity);
    }

    loadNumberOfEntitiesYouOwn(onDataLoaded) {
        this.entities.subscribe(loadedEntities => {
            onDataLoaded(this.search(loadedEntities, this.currentUser.uid, "v.owner").length);
        }, this.errorFunc);
    }

    loadnumberOfMaxEntities(onDataLoaded) {
        this.users.subscribe(loadedUsers => {
            onDataLoaded(this.search(loadedUsers, this.currentUser.uid, "v.uid")[0].numberOfMaxEntities);
        }, this.errorFunc);
    }




    // ------------------------------------------------------------------------------------------------------------------

    /**
     * Facebook Login
     *
     */


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
    return this.authState ? this.currentUser.fullname : 'no Name';
  }

  get currentUserEmail(): string {
    return this.authState ? this.authState.auth.email : 'no Email';
  }

  get currentUserPhotoURI(): string {
    return this.authState ? this.currentUser.photoURL : 'no photo';
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
      this.usersRef.child(user.uid).set({
        uid: user.uid,
        entity: "No library, join a library to get started",
        entityName: "No library, join a library to get started",
        email: user.email || "",
        photoURL: user.photoURL || "",
        fullname: user.displayName || ""
      });
    } else {
      console.log("User exist in db");
    }
  }




    // ------------------------------------------------------------------------------------------------------------------

    /**
     * Image
     *
     */

  uploadImage(photoURI, key) {
    if(photoURI != null) {
      firebase.storage().ref('images/' + this.currentUser.entity + "/" + key)
      .putString(photoURI.split(",")[1], 'base64').then(function(snapshot) {
        this.items.update(key, {
          photoURL: snapshot.downloadURL
        });
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      }.bind(this))
    }
  }

  deleteImage(key) {
      firebase.storage().ref('images/' + this.currentUser.entity + "/" + key).delete().catch(() => {});
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




    // ------------------------------------------------------------------------------------------------------------------

    /**
     * Utils
     *
     */


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

  isAndroid() {
      return this.platform.is("android")
  }

  msgToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    return toast.present();
  }


//   listPendingUsers() {
//     console.log("All pending users...............");
//     let pendingQuery = firebase.database().ref('/users').orderByChild("isPending").equalTo("true");
//     pendingQuery.once("value")
//       .then(function (snapshot) {
//         let total = snapshot.numChildren();
//         snapshot.forEach(function (childSnapshot) {
//           let usersUid = childSnapshot.key;
//           let userName = childSnapshot.child("fullname").val();
//           let isPending = childSnapshot.child("isPending").val();
//           let pending = isPending === "true"? 'Yes':'No';
//           console.log('UserUid: '+usersUid+' Name: '+userName+' isPending: '+pending);
//         });
//         console.log('Total: '+total);
//       });
//   }


//   listUsers() {
//     console.log("List all users alphabetical...............");
//     let userQuery = firebase.database().ref('/users').orderByKey();
//     userQuery.once("value")
//       .then(function (snapshot) {
//         let total = snapshot.numChildren();
//         snapshot.forEach(function (childSnapshot) {
//           let usersUid = childSnapshot.key;
//           let userName = childSnapshot.child("fullname").val();
//           let entity = childSnapshot.child("entity").val();
//           let isAdmin = childSnapshot.child("isAdmin").val();
//           let admin = isAdmin === "true"? 'Yes' : 'No';
//           console.log('Name: '+userName+' Entity: '+entity+' Admin: '+admin);
//         });
//         console.log('Total: '+total);
//       });
//   }

  signUpEmail(email: string, pass: string, username: string) {
// crate user auth
     return this.firebase.auth().createUserWithEmailAndPassword(email, pass).then((newUser) => {
      //sign in the user
      this.fireAuth.signInWithEmailAndPassword(email, pass).then((authenticatedUser) => {
        // create user profile in db
        this.usersRef.child(authenticatedUser.uid).set({
          uid: authenticatedUser.uid,
          email: email,
          fullname: username || 'none',
          entity: "No library, join a library to get started",
          entityName: "No library, join a library to get started",
          photoURL:  "./assets/icons/profile.svg"
        });
      });
    })
  } // emailSignUp

  loginWithEmail(email, pass) {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }

  forgotPasswordUser(email: any){
    return this.fireAuth.sendPasswordResetEmail(email);
  }


  // Inn app purchase

  purchase() {
      this.iap.getProducts(['library']).then(products => {
          this.iap.buy(products[0].productId).then(data => {
              this.iap.consume(data.productType, data.receipt, data.signature).then(() => {
                  this.increaseNumberOfMaxEntities();
                }).catch(this.errorFunc);
            })
            .catch(this.errorFunc);
        }).catch(this.errorFunc);
    }

    increaseNumberOfMaxEntities() {
        if(this.currentUser.numberOfMaxEntities) {
            return this.users.update(this.currentUser.$key, {
                numberOfMaxEntities: (parseInt(this.currentUser.numberOfMaxEntities) + 1).toString()
            })
        }
        else {
            return this.users.update(this.currentUser.$key, {
                numberOfMaxEntities: "1"
            })
        }
    }
    
    
    
    // Update facebook profile picture

    updateFacebookPicture() {
        if (this.platform.is('cordova')) {
            Facebook.api("me/?fields=picture.type(large)", ['email', 'public_profile'])
            .then(response => {
                this.users.update(this.authState.auth.uid, {
                    photoURL: response.picture.data.url
                });
            })
        }
    }



}
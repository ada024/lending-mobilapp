import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;

  constructor(public http: Http, public af: AngularFire) {
    this.items = af.database.list('/items');
    this.users = af.database.list('/users');
  }

  getItems() {
    return this.items;
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

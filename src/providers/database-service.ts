import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;

  constructor(public http: Http, public af: AngularFire) {
    this.items = af.database.list('/items');
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.items.push({
      name: item.name,
      id: item.id
    });
  }

  clear() {
    this.items.remove();
  }

}

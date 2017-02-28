import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService {
items = [
{name:"item 1", id:"1"},
{name:"item 2", id:"2"}
]

  constructor(public http: Http) {}

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
  }

}

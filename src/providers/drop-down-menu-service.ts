import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DatabaseService } from '../providers/database-service';
import {PopoverController} from 'ionic-angular';
import {DropdownMenuPage} from '../pages/dropdown-menu/dropdown-menu';


@Injectable()
export class DropDownMenuService {

  constructor(public http: Http, public popoverCtrl: PopoverController, public db: DatabaseService) {}

  openDropdownMenu(event) {
    this.popoverCtrl.create(DropdownMenuPage).present({
      ev: event
    });
  }
}

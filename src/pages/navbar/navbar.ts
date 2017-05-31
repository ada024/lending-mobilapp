import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../providers/database-service';
import { DropDownMenuService} from '../../providers/drop-down-menu-service';


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public db: DatabaseService, public menu: DropDownMenuService) {}
}

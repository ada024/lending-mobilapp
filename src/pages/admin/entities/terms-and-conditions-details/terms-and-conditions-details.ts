import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';


@Component({
  selector: 'page-terms-and-conditions-details',
  templateUrl: 'terms-and-conditions-details.html'
})
export class TermsAndConditionsDetailsPage {
termsAndConditions;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public menu: DropDownMenuService, public db:DatabaseService) {
    var entity = navParams.get("entity");
    this.termsAndConditions = entity.termsAndConditions;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsDetailsPage');
  }

  okClicked(){
    this.db.updateTermsAndConditions(this.termsAndConditions);
    this.navCtrl.pop();
  }

}

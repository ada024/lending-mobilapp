import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-terms-and-conditions-details',
  templateUrl: 'terms-and-conditions-details.html'
})
export class TermsAndConditionsDetailsPage {
termsAndConditions;


  constructor(public navCtrl: NavController, public navParams: NavParams, public db:DatabaseService) {
    var entity = navParams.get("entity");
    this.termsAndConditions = entity.termsAndConditions;
  }

  okClicked(){
    this.db.updateTermsAndConditions(this.termsAndConditions);
    this.navCtrl.pop();
  }

  cancelClicked() {
    this.navCtrl.pop();
  }

}

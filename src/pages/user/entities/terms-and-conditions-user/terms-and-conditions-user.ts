import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-terms-and-conditions-user',
  templateUrl: 'terms-and-conditions-user.html'
})
export class TermsAndConditionsUserPage {
termsAndConditions;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var entity = navParams.get("entity");
    this.termsAndConditions = entity.termsAndConditions;
  }

  back() {
    this.navCtrl.pop();
  }
}

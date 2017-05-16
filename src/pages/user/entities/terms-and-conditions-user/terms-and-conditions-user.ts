import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TermsAndConditionsUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsUserPage');
  }

}

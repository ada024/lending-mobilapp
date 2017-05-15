import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

/*
  Generated class for the TermsAndConditionsDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsDetailsPage');
  }

  okClicked(){
    this.db.updateTermsAndConditions(this.termsAndConditions);
    this.navCtrl.pop();
  }

}

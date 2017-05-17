import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';

/*
  Generated class for the TermsAndConditions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html'
})
export class TermsAndConditionsPage {
termsAndConditions;
entityName;
entityOffice;
resDays;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:DatabaseService) {
this.entityName = navParams.get("entityName");
this.entityOffice=navParams.get("entityOffice");
this.resDays = navParams.get("resDays");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsPage');
  }

  addTermsAndConditions(){
    this.db.addEntity(this.entityName, this.entityOffice, this.resDays, this.termsAndConditions).then(resolve => {
      this.db.setEntity({$key: resolve.key, name: this.entityName});
    });
    this.navCtrl.remove(2, 5);
    this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }

}

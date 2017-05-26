import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { DropDownMenuService} from '../../../../providers/drop-down-menu-service';


@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html'
})
export class TermsAndConditionsPage {
termsAndConditions;
entityName;
entityOffice;
resDays;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public menu: DropDownMenuService, public db:DatabaseService) {
this.entityName = navParams.get("entityName");
this.entityOffice=navParams.get("entityOffice");
this.resDays = navParams.get("resDays");
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

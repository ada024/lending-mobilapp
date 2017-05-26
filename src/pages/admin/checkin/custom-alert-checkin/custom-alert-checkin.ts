import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';


@Component({
  selector: 'page-custom-alert-checkin',
  templateUrl: 'custom-alert-checkin.html'
})
export class CustomAlertCheckinPage {
loan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	  this.loan = navParams.get("loan");
  }
  
  noClicked(){
	  this.viewCtrl.dismiss();
  }
  
  yesClicked(loan){
	  this.viewCtrl.dismiss(loan);
  }
  

}

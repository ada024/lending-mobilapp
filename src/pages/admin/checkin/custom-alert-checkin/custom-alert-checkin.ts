import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';

/*
  Generated class for the CustomAlertCheckin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-custom-alert-checkin',
  templateUrl: 'custom-alert-checkin.html'
})
export class CustomAlertCheckinPage {
loan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	  this.loan = navParams.get("loan");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomAlertPage');
  }
  
  noClicked(){
	  this.viewCtrl.dismiss();
  }
  
  yesClicked(loan){
	  this.viewCtrl.dismiss(loan);
  }
  

}

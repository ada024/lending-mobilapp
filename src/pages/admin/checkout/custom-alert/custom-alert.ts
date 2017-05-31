import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';


@Component({
  selector: 'page-custom-alert',
  templateUrl: 'custom-alert.html'
})
export class CustomAlertPage {
item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	  this.item = navParams.get("item");
  }
  
  noClicked(){
	  this.viewCtrl.dismiss();
  }
  
  yesClicked(item){
	  this.viewCtrl.dismiss(item);
  }
  

}

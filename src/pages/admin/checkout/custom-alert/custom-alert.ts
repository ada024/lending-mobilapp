import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';

/*
  Generated class for the CustomAlert page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-custom-alert',
  templateUrl: 'custom-alert.html'
})
export class CustomAlertPage {
item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	  this.item = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomAlertPage');
  }
  
  noClicked(){
	  this.viewCtrl.dismiss();
  }
  
  yesClicked(item){
	  this.viewCtrl.dismiss(item);
  }
  

}

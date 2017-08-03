import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalTermsAndConditionsPage } from '../global-terms-and-conditions/global-terms-and-conditions';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToGlobalTermsAndConditionsPage() {
    this.navCtrl.push(GlobalTermsAndConditionsPage);
  }
}

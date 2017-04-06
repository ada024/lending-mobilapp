import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { NavController } from 'ionic-angular';

import { ChooseAccountTypePage } from '../choose-account-type/choose-account-type';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    root: any;
    constructor(public navCtrl: NavController, public element: ElementRef, public af: AngularFire) {
        this.element.nativeElement
    }
    
ngOnInit(){
  this.root = this.element.nativeElement;
  console.log(this.root);

  var fbBtn =  this.root.querySelector('#fb-login');
  fbBtn.addEventListener('click',this.onFacebookLogin.bind(this));

}
    
    
onFacebookLogin(e){
  let self = this;
  this.af.auth.login({
    provider: AuthProviders.Facebook,
    method: AuthMethods.Popup
  }).then(function(response){
    let user = {
      email:response.auth.email,
      picture:response.auth.photoURL
    };
    window.localStorage.setItem('user',JSON.stringify(user));
    self.navCtrl.pop();
  }).catch(function(error){
    console.log(error);
  });
}
    
    /*
    login() {
        this.navCtrl.push(ChooseAccountTypePage);
    }
    */

}

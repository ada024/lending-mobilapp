﻿import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { ChooseAccountTypePage } from '../pages/choose-account-type/choose-account-type';
import { HomeAdminPage } from '../pages/home-admin/home-admin';
import { HomeUserPage } from '../pages/home-user/home-user';

import { ItemsAdminPage } from '../pages/items-admin/items-admin';
import { ItemsAddNameAdminPage } from '../pages/items-add-name-admin/items-add-name-admin';
import { ItemsAddPhotoAdminPage } from '../pages/items-add-photo-admin/items-add-photo-admin';
import { ItemsAddTagAdminPage } from '../pages/items-add-tag-admin/items-add-tag-admin';
import { ItemsAddTagScannAdminPage } from '../pages/items-add-tag-scann-admin/items-add-tag-scann-admin';
import { ItemsAddSuccessAdminPage } from '../pages/items-add-success-admin/items-add-success-admin';

import { CheckoutFirstPage } from '../pages/checkout-first/checkout-first';
import { CheckoutItemsPage } from '../pages/checkout-items/checkout-items';
import { CheckoutUserPage } from '../pages/checkout-user/checkout-user';
import { CheckoutItemPickedPage } from '../pages/checkout-item-picked/checkout-item-picked';
import { CheckoutUserPickedPage } from '../pages/checkout-user-picked/checkout-user-picked';
import { ConfirmCheckoutPage } from '../pages/confirm-checkout/confirm-checkout';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAHfCQArz_9VdSVJ0rGhaEMYeZuv8JJCIY",
  authDomain: "borrowing-app.firebaseapp.com",
  databaseURL: "https://borrowing-app.firebaseio.com",
  storageBucket: "borrowing-app.appspot.com",
  messagingSenderId: "226399216748"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ChooseAccountTypePage,
    HomeAdminPage,
    HomeUserPage,

    ItemsAdminPage,
    ItemsAddNameAdminPage,
    ItemsAddPhotoAdminPage,
    ItemsAddTagAdminPage,
    ItemsAddTagScannAdminPage,
    ItemsAddSuccessAdminPage,

    CheckoutFirstPage,
    CheckoutItemsPage,
	ConfirmCheckoutPage,
	  CheckoutUserPage,
	  CheckoutItemPickedPage,
	  CheckoutUserPickedPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ChooseAccountTypePage,
    HomeAdminPage,
    HomeUserPage,

    ItemsAdminPage,
    ItemsAddNameAdminPage,
    ItemsAddPhotoAdminPage,
    ItemsAddTagAdminPage,
    ItemsAddTagScannAdminPage,
    ItemsAddSuccessAdminPage,

    CheckoutFirstPage,
    CheckoutItemsPage,
	ConfirmCheckoutPage,
	  CheckoutUserPage,
  	CheckoutItemPickedPage,
	  CheckoutUserPickedPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ChooseAccountTypePage } from '../pages/choose-account-type/choose-account-type';
import { HomeAdminPage } from '../pages/home-admin/home-admin';
import { ItemsAdminPage } from '../pages/items-admin/items-admin';
import { ItemsAddNameAdminPage } from '../pages/items-add-name-admin/items-add-name-admin';
import { ItemsAddPhotoAdminPage } from '../pages/items-add-photo-admin/items-add-photo-admin';

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
    ItemsAdminPage,
    ItemsAddNameAdminPage,
    ItemsAddPhotoAdminPage
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
    ItemsAdminPage,
    ItemsAddNameAdminPage,
    ItemsAddPhotoAdminPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

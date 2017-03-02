import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { ItemsPage } from '../pages/items/items';

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
    HomePage,
    MainPage,
    ItemsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    ItemsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

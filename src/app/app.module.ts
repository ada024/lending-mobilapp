import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { DatabaseService} from '../providers/database-service'
import { DeveloperToolsPage } from '../pages/admin/developer-tools/developer-tools';
import { DropdownMenuPage } from '../pages/dropdown-menu/dropdown-menu';

import { LoginPage } from '../pages/login/login';
import { ChooseAccountTypePage } from '../pages/choose-account-type/choose-account-type';
import { HomeAdminPage } from '../pages/admin/home-admin/home-admin';
import { HomeUserPage } from '../pages/user/home-user/home-user';

import { ItemsAdminPage } from '../pages/admin/items/items-admin/items-admin';
import { ItemsAddNameAdminPage } from '../pages/admin/items/items-add-name-admin/items-add-name-admin';
import { ItemsAddPhotoAdminPage } from '../pages/admin/items/items-add-photo-admin/items-add-photo-admin';
import { ItemsAddTagAdminPage } from '../pages/admin/items/items-add-tag-admin/items-add-tag-admin';
import { ItemsAddTagScannAdminPage } from '../pages/admin/items/items-add-tag-scann-admin/items-add-tag-scann-admin';
import { ItemsAddSuccessAdminPage } from '../pages/admin/items/items-add-success-admin/items-add-success-admin';
import { ItemsListAdminPage } from '../pages/admin/items/items-list-admin/items-list-admin';
import { ItemsDetailsAdminPage } from '../pages/admin/items/items-details-admin/items-details-admin';

import { UsersAdminPage } from '../pages/admin/users/users-admin/users-admin';
import { UsersListAdminPage } from '../pages/admin/users/users-list-admin/users-list-admin';
import { UsersPendingAdminPage } from '../pages/admin/users/users-pending-admin/users-pending-admin';

import { EntityAdminPage } from '../pages/admin/entities/entity-admin/entity-admin';
import { EntityAddAdminPage } from '../pages/admin/entities/entity-add-admin/entity-add-admin';
import { EntityListAdminPage } from '../pages/admin/entities/entity-list-admin/entity-list-admin';
import { EntityDetailsAdminPage } from '../pages/admin/entities/entity-details-admin/entity-details-admin';


import { CheckoutItemsPage } from '../pages/admin/checkout/checkout-items/checkout-items';
import { CheckoutUserPage } from '../pages/admin/checkout/checkout-user/checkout-user';
import { CheckoutItemPickedPage } from '../pages/admin/checkout/checkout-item-picked/checkout-item-picked';
import { CheckoutUserPickedPage } from '../pages/admin/checkout/checkout-user-picked/checkout-user-picked';
import { CustomAlertPage } from '../pages/admin/checkout/custom-alert/custom-alert';

import { CheckinFirstPage } from '../pages/admin/checkin/checkin-first/checkin-first';
import { CheckinConfirmPage } from '../pages/admin/checkin/checkin-confirm/checkin-confirm';
import { CustomAlertCheckinPage } from '../pages/admin/checkin/custom-alert-checkin/custom-alert-checkin';

import { EntityUserPage } from '../pages/user/entities/entity-user/entity-user';
import { EntityListUserPage } from '../pages/user/entities/entity-list-user/entity-list-user';
import { EntityChangeUserPage } from '../pages/user/entities/entity-change-user/entity-change-user';
import { EntityDetailsUserPage } from '../pages/user/entities/entity-details-user/entity-details-user';
import { EntityJoinUserPage } from '../pages/user/entities/entity-join-user/entity-join-user';

import { ItemListUserPage } from '../pages/user/items/item-list-user/item-list-user';
import { ItemPickedUserPage } from '../pages/user/items/item-picked-user/item-picked-user';
import { ItemCalendarUserPage } from '../pages/user/items/item-calendar-user/item-calendar-user';
import { ItemConfirmPickupPage } from '../pages/user/items/item-confirm-pickup/item-confirm-pickup';

import { NgCalendarModule } from 'ionic2-calendar';




//Firebase Settings
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
    DeveloperToolsPage,
    DropdownMenuPage,

    ItemsAdminPage,
    ItemsAddNameAdminPage,
    ItemsAddPhotoAdminPage,
    ItemsAddTagAdminPage,
    ItemsAddTagScannAdminPage,
    ItemsAddSuccessAdminPage,
    ItemsListAdminPage,
    ItemsDetailsAdminPage,

    UsersAdminPage,
    UsersListAdminPage,
    UsersPendingAdminPage,

    EntityAdminPage,
    EntityAddAdminPage,
    EntityListAdminPage,
    EntityDetailsAdminPage,

    CheckoutItemsPage,
	  CheckoutUserPage,
	  CheckoutItemPickedPage,
    CheckoutUserPickedPage,
    CustomAlertPage,
	
	CheckinFirstPage,
      CheckinConfirmPage,
      CustomAlertCheckinPage,

    EntityUserPage,
    EntityListUserPage,
    EntityChangeUserPage,
    EntityDetailsUserPage,
      EntityJoinUserPage,

      ItemListUserPage,
      ItemPickedUserPage,
      ItemCalendarUserPage,
      ItemConfirmPickupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
      NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ChooseAccountTypePage,
    HomeAdminPage,
    HomeUserPage,
    DeveloperToolsPage,
    DropdownMenuPage,

    ItemsAdminPage,
    ItemsAddNameAdminPage,
    ItemsAddPhotoAdminPage,
    ItemsAddTagAdminPage,
    ItemsAddTagScannAdminPage,
    ItemsAddSuccessAdminPage,
    ItemsListAdminPage,
    ItemsDetailsAdminPage,

    UsersAdminPage,
    UsersListAdminPage,
    UsersPendingAdminPage,

    EntityAdminPage,
    EntityAddAdminPage,
    EntityListAdminPage,
    EntityDetailsAdminPage,

    CheckoutItemsPage,
	  CheckoutUserPage,
  	CheckoutItemPickedPage,
    CheckoutUserPickedPage,
    CustomAlertPage,

	CheckinFirstPage,
      CheckinConfirmPage,
      CustomAlertCheckinPage,
	
    EntityUserPage,
    EntityListUserPage,
    EntityChangeUserPage,
    EntityDetailsUserPage,
      EntityJoinUserPage,

      ItemListUserPage,
      ItemPickedUserPage,
      ItemCalendarUserPage,
      ItemConfirmPickupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DatabaseService]
})
export class AppModule {}

import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityAddAdminPage } from '../entity-add-admin/entity-add-admin';
import { PaymentPage } from '../../../payment/payment';


@Component({
  selector: 'page-entity-info-admin',
  templateUrl: 'entity-info-admin.html'
})
export class EntityInfoAdminPage {
  numberOfEntitiesYouOwn;
  numberOfMaxEntities;
  numberOfMaxEntitiesPlussOne;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public db: DatabaseService) {
    db.loadNumberOfEntitiesYouOwn(this.onNumberOfEntitiesYouOwn.bind(this));
    db.loadnumberOfMaxEntities(this.onNumberOfMaxEntities.bind(this));
  }

  onNumberOfEntitiesYouOwn(numberOfEntitiesYouOwn){
    this.zone.run(() => {
      this.numberOfEntitiesYouOwn = numberOfEntitiesYouOwn;
    });
  }

  onNumberOfMaxEntities(numberOfMaxEntities){
    this.zone.run(() => {
      this.numberOfMaxEntities = numberOfMaxEntities;
      this.numberOfMaxEntitiesPlussOne = (parseInt(numberOfMaxEntities) + 1).toString();
    });
  }

  goToEntityAddAdminPage() {
      this.navCtrl.push(EntityAddAdminPage);
  }

  goToPaymentPage() {
      this.navCtrl.push(PaymentPage,{purchaseAdminMode: false});
  }

}
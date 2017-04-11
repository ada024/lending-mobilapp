import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-entity-list-user',
  templateUrl: 'entity-list-user.html'
})
export class EntityListUserPage {
  entitiesList: any;
	loadedEntitiesList: any;
	searchString = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    this.db.loadEntities(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
    this.zone.run(() => {
      this.entitiesList = this.loadedEntitiesList = loadedList;
    });
  }

  search(){
    this.entitiesList = this.db.search(this.loadedEntitiesList, this.searchString, "v.name");
  }

  changeEntity(entity) {
    this.db.setEntity(entity);
    this.navCtrl.pop();
  }

}

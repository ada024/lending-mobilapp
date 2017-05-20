import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';


@Component({
  selector: 'page-entity-change-user',
  templateUrl: 'entity-change-user.html'
})
export class EntityChangeUserPage {
  entitiesList: any;
	loadedEntitiesList: any;
	searchString = '';
  currentUser;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    this.currentUser = db.currentUser;
    this.db.loadJoinedEntities(this.onDataLoaded.bind(this));
  }

  onDataLoaded(loadedList) {
    this.zone.run(() => {
      this.entitiesList = this.loadedEntitiesList = loadedList;
      this.entitiesList.sort((entity1, entity2)=> { if(entity1.$key == this.currentUser.entity && entity2.$key!=this.currentUser.entity){
        return -1;
      }
      return 1;
      });
    });
  }

  search(){
    this.entitiesList = this.db.search(this.loadedEntitiesList, this.searchString, "v.name");
  }

  changeEntity(entity) {
    this.db.setEntity(entity);
    this.navCtrl.popToRoot();
  }
}

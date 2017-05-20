import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../../../providers/database-service';
import { EntityJoinUserPage } from '../entity-join-user/entity-join-user';


@Component({
  selector: 'page-entity-list-user',
  templateUrl: 'entity-list-user.html'
})
export class EntityListUserPage {
  entitiesList: any;
	loadedEntitiesList: any;
	searchString = '';
  currentUser;
  joinedEntities;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public zone: NgZone, public db: DatabaseService) {
    this.currentUser = db.currentUser;
    db.loadJoinedEntities(this.onJoinedLoaded.bind(this));
    this.db.loadEntities(this.onDataLoaded.bind(this));
  }

onJoinedLoaded(joined){
  this.joinedEntities = joined;
}

  onDataLoaded(loadedList) {
    this.zone.run(() => {
      this.entitiesList = this.loadedEntitiesList = loadedList;
       this.entitiesList.sort((entity1, entity2)=> { if(entity1.owner != this.currentUser.uid && entity2.owner==this.currentUser.uid){
        return -1;
      }
      return 1;
      });
    });
  }

  search(){
    this.entitiesList = this.db.search(this.loadedEntitiesList, this.searchString, "v.name");
  }

  goToEntityJoinUserPage(entity) {
    this.navCtrl.push(EntityJoinUserPage, {entity: entity});
  }

  checkIfJoined(entity){
    var haveJoined = false;
    for(var jEntity of this.joinedEntities){
      if(jEntity.$key == entity.$key){
        haveJoined = true;
        break;
      }
    }
    return haveJoined;
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SavedCities provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CitiesRest {

  private baseUrl = "https://weather-watcher-backend-dcarandangssf.c9users.io:8080/api/"
  private path = "Cities/"
  
  constructor(public http: Http) {
    console.log('Hello SavedCities Provider');
  }


  save(card, token) {
    console.log("saved cards: " + card)
    return this.http.post(
      this.baseUrl + this.path +
        '?access_token=' + token,
      card
    );
  }
  
  getList(userId, token) {
    console.log("getting list")
    return this.http.get(
      this.baseUrl + this.path +
        '?filter[where][userId]=' + userId +
        '&access_token=' + token
    )
  }

  removeCard(cardId, token) {
    console.log("removed card from favorites")
    return this.http.delete(
      this.baseUrl + this.path +
        cardId + '?access_token=' + token
        )
  }
// http://weather-watcher-backend-dcarandangssf.c9users.io:8080/api/Cities/7xT0wTA1rw73p0NuUK3wMd2NEGZiec8AiRjOBlCZp1mHocnmU43yOFXRrxDyOTUZ?access_token=kq0TPBQkvTX9HE8oYOu8v3KuahJAR9BPOHyJoddkAvJJdvQSLcPfXE1nerdsGsHe&access_token=kq0TPBQkvTX9HE8oYOu8v3KuahJAR9BPOHyJoddkAvJJdvQSLcPfXE1nerdsGsHe


// http://weather-watcher-backend-dcarandangssf.c9users.io:8080/api/Cities?filter=%7B%22WHERE%22%3A%20%7B%22userId%22%3A%20%22582df67d1ae0010206124d30%22%7D%7D&access_token=cp57s4nMSdsK8540104oRkUThIexJxtlPbchpkAOodj3XDAqDBp0E2c4Emqqg3GL&access_token=cp57s4nMSdsK8540104oRkUThIexJxtlPbchpkAOodj3XDAqDBp0E2c4Emqqg3GL


  
}
// http://weather-watcher-backend-dcarandangssf.c9users.io:8080/api/Cities?access_token=
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { CitiesRest } from './cities-rest';
import { LocationService } from './location-service';
import { Card } from '../models/weather-card-model'


@Injectable()
export class CardService {
  public isFavorited: any;
  public cardInfo: any;
  public city: any;
  public requestUrl: any;
  public card: any;


  cardList = [];
  
  constructor(public http: Http,
              public citiesRest: CitiesRest,
              public locationService: LocationService) {
    console.log('Hello CardService Provider');
    this.card = new Card("" , "", "", false)
  }

  saveCard(card) {
    card.isFavorited = true;
    console.log(card)
      this.citiesRest.save(card, window.localStorage.getItem("token"))
        .subscribe(res => {
          console.log(res);
          if (res.status === 200) {
            console.log(this.card.cityName + " saved to favorites!");
          }
        }, err => {
          console.log(err);
        })
  }
  
  deleteCard(cardId) {
    console.log("removed favorite")
      this.citiesRest.removeCard(cardId, window.localStorage.getItem("token"))
        .subscribe(res => {
          console.log(res);
          if (res.status === 200) {
            console.log(this.card.cityName + " deleted from favorites!");
          }
        }, err => {
          console.log(err);
        })
  }
  
  saveCardList = function(card, token) {
    this.citiesRest.save(card, token)
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log("warning!");
    });
  };
  
  getCardList(userId, token) {
    console.log("getting card list")
    return this.citiesRest.getList(userId, token)
  }
  
}

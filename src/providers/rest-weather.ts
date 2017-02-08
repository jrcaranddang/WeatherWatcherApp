import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RestWeather {
  private appId = '361c63784c396a68';
  private baseUrl = 'https://api.wunderground.com/api/';
  private searchUrl = '/autocomplete/';
  // private searchUrl = 'https://autocomplete.wunderground.com/';

  city: any;
  state: any;

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
  }

  search(query) {
    let Obs = Observable.create(observer => {
      
      query = query.split(' ').join('%20')
      
      let url = this.searchUrl
      url += "aq?query=" + query
      console.log(url)
     
      this.http.get(url)
        .subscribe(
          data => {
            observer.next(data.json());
          },
          err => observer.error(err),
          () => observer.complete()
        )
       
    })
    return Obs
  }

// http://autocomplete.wunderground.com/aq?query=San%20F

  searchWeather(lat, lng) {
    let Obs = Observable.create(observer => {
          
          let url = this.baseUrl + this.appId;
          url += '/geolookup/q/';
          url += `${lat},${lng}.json`;
          
          this.http.get(url)
            .subscribe(
              data => {
                observer.next(data.json());
              },
              err => observer.error(err),
              () => observer.complete()
            )
            
        })
    return Obs
  }

  local() {
    let Obs = Observable.create(observer => {
      Geolocation.getCurrentPosition()
        .then((resp) => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          
          let url = this.baseUrl + this.appId;
          url += '/geolookup/q/';
          url += `${lat},${lng}.json`;
          
          this.http.get(url)
            .subscribe(
              data => {
                observer.next(data.json());
              },
              err => observer.error(err),
              () => observer.complete()
            )
            
        })
    })
    return Obs
  }
  
  getForecast(city, state) {
    
    let Obs = Observable.create(observer => {
      
      let url = this.baseUrl + this.appId;
      url += '/forecast/q/';
      url += `${state}/${city}.json`;
      console.log(url);
      this.http.get(url)
        .subscribe(
          data => {
            observer.next(data.json());
          },
          err => observer.error(err),
          () => observer.complete()
        )
    })
    return Obs
  }

  // http://api.wunderground.com/api/c56568eedbc03ac8/forecast/q/CA/San_Francisco.json
}
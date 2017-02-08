import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RestWeather } from './rest-weather'



@Injectable()
export class LocationService {
  public city: any;
  public cityParse: any;
  public state: any;
  public requestUrl: any;
  public forecast: any;
  public location: any;
  public localForecast: any;
  public low: any;
  public high: any;
  public day: any;

  constructor(
    public http: Http,
    public weather: RestWeather) {
      console.log('Hello SearchService Provider');
    }

  searchLocation(cityName) {
    this.weather.search(cityName)
      .subscribe(
        data => {
          this.location = data;
          console.log(this.location)
          return this.location;
        })
  }

  getLocation() {
    this.weather.local()
      .subscribe(
        data => {
          this.location = data.location;
          this.city = data.location.city;
          this.cityParse = data.location.city.split(' ').join('_');
          this.state = data.location.state;
          this.requestUrl = data.location.requesturl;
          this.getLocalForecast(this.cityParse, this.state)
          return {
            "location": this.location,
            "city": this.city,
            "cityParse": this.cityParse,
            "state": this.state,
            "requestUrl": this.requestUrl,
          }
        })
  }

  getLocalForecast(city, state) {
    this.weather.getForecast(city, state).subscribe(
      data => {
        this.localForecast = data;
        this.low = data.forecast.simpleforecast.forecastday["0"].low.fahrenheit;
        this.high = data.forecast.simpleforecast.forecastday["0"].high.fahrenheit;
        this.day = data.forecast.txt_forecast.forecastday["0"].title;
        this.forecast = data.forecast.txt_forecast.forecastday["0"].fcttext;
        console.log(this.localForecast);
        return {
          "localForecast": this.localForecast,
          "low": this.low,
          "high": this.high,
          "day": this.day,
          "forecast": this.forecast,
        }
      })
  }

}

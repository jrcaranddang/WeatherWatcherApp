import { Component, Input } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RestWeather } from '../../providers/rest-weather';
import { Card } from '../../models/weather-card-model'
import { CardService } from '../../providers/card-service'


@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsPage {
  @Input() savedCard;
  
  public results: any;
  public lat: any;
  public lon: any;
  public card: any;
  public city: any;
  public cityParse: any;
  public state: any;
  public requestUrl: any;
  public forecast: any;
  public forecastC: any;
  public location: any;
  public localForecast: any;
  public low: any;
  public high: any;
  public day: any;
  public weatherCard: any;
  public locationData: any;
  public forecastData: any;
  public lowF: any;
  public highF: any;
  public lowC: any;
  public highC: any;
  public icon: any;
  public icon2: any;
  public savedResults: any;
  public savedResult: any;

  constructor(
    public navCtrl: NavController,
    public weather: RestWeather,
    public toastController: ToastController,
    public cardService: CardService) {
    }

  ionViewDidLoad() {
    console.log('Hello SearchResultsPage Page');
  }

  onClear(search) {
    console.log("clear search")
    console.log(search)
    this.results = null;
  }

  searchLocation(cityName) {
    console.log(cityName)
    this.weather.search(cityName)
      .subscribe(
        data => {
          this.results = data.RESULTS;
          console.log(this.results)
        }
      )
  }

  displayWeather(result) {
    console.log("display weather")
    this.lat = result.lat
    this.lon = result.lon
    console.log(this.lat)
    console.log(this.lon)
    this.weather.searchWeather(this.lat, this.lon)
      .subscribe(
          data => {
            
            this.location = data.location;
            this.city = data.location.city;
            this.cityParse = data.location.city.split(' ').join('_');
            this.state = data.location.state;
            this.requestUrl = 'https://api.wunderground.com/api/c56568eedbc03ac8/forecast/q/' + this.state + '/' + this.cityParse + '.json';
            
            this.card = new Card("" , this.city + ", " + this.state, this.requestUrl, false)
            console.log(this.card)
            
            console.log(this.location)
            this.getLocalForecast(this.cityParse, this.state)
            this.results = null
          })
  }
  
  getLocalForecast(city, state) {
    this.weather.getForecast(city, state)
      .subscribe(
        data => {
          this.localForecast = data;
          this.lowF = data.forecast.simpleforecast.forecastday["0"].low.fahrenheit;
          this.highF = data.forecast.simpleforecast.forecastday["0"].high.fahrenheit;
          this.lowC = data.forecast.simpleforecast.forecastday["0"].low.celsius;
          this.highC = data.forecast.simpleforecast.forecastday["0"].high.celsius;
          this.day = data.forecast.txt_forecast.forecastday["0"].title;
          this.forecast = data.forecast.txt_forecast.forecastday["0"].fcttext;
          this.forecastC = data.forecast.txt_forecast.forecastday["0"].fcttext_metric;
          this.icon = data.forecast.txt_forecast.forecastday["0"].icon_url;
          this.icon = data.forecast.txt_forecast.forecastday["0"].icon_url.split('p').join('ps');
          this.icon2 = data.forecast.txt_forecast.forecastday["0"].icon_url;
          
          this.low = this.lowF;
          this.high = this.highF;
        }
      )
  }
    
  saveFavorite(card) {
    console.log("favorite saved")
    card.userId = window.localStorage.getItem("userId")
    card.cityAPIUrl = this.requestUrl
    this.cardService.saveCard(card)
    console.log(card)
    this.showToast()
  }
  
  showToast() {
    let toast = this.toastController.create({
      message: 'Saved to favorites!',
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }
  
  degrees(deg) {
    console.log("degrees changed")
    console.log(deg)
    
    if (deg.checked === true) {
      this.low = this.lowF;
      this.high = this.highF;
    }
    else if (deg.checked === false) {
      this.low = this.lowC;
      this.high = this.highC;
    }
    
  }
}

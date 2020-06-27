import { Component } from '@angular/core';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Capability } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  response: string;
  nouvelleResponse: string;
  nouveauWeather;
  weather;
  insee: string;
  LAMETEO: number;

  constructor() {
    const city = 'Paris';
    this.getInsee(city);
  }
  getInsee(city) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://api.meteo-concept.com/api/location/cities?token=9a237018e181a5975690cfb562ce2d50c0d1726ea51668d42e3f4b9507d028a3&search=' + city);
    request.responseType = 'text';
    request.onload = () => {
      this.response = request.response;
      this.weather = JSON.parse(this.response);
      this.insee = this.weather.cities[0].insee;
      this.getActuel();
    };
    request.send();
  }

  getActuel() {
    const query = new XMLHttpRequest();
    query.open('GET', 'https://api.meteo-concept.com/api/forecast/nextHours?token=9a237018e181a5975690cfb562ce2d50c0d1726ea51668d42e3f4b9507d028a3&insee=' + this.insee);
    query.responseType = 'text';
    query.onload = () => {
      this.nouvelleResponse = query.response;
      this.nouveauWeather = JSON.parse(this.nouvelleResponse);
      this.LAMETEO = this.nouveauWeather.forecast[0].temp2m;
    };
    query.send();
  }



}

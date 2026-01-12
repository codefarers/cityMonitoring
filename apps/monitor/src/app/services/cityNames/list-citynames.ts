import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cityNamesKey, cityInfoKey } from '@monitor/keys';

@Injectable({
  providedIn: 'root',
})
export class ListCitynames {
  private http = inject(HttpClient);

  searchCities(cityNameAndCode: string): Observable<any> {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityNameAndCode}&limit=20&appid=${cityNamesKey}`
    );
  }

  getCityAirQuality(cityNameAndCode:string):Observable<any>{
    return this.http.get(
      `https://data.api.xweather.com/airquality/${cityNameAndCode}?client_id=26I9R7CgX2jHRzwt0jhwo&client_secret=${cityInfoKey}`
    );
  }

  getCityWeatherData(cityNameAndCode:string):Observable<any>{
    return this.http.get(
      `https://data.api.xweather.com/conditions/${cityNameAndCode}?client_id=26I9R7CgX2jHRzwt0jhwo&client_secret=${cityInfoKey}`
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webApiKey } from '@monitor/keys';

@Injectable({
  providedIn: 'root',
})
export class ListCitynames {
  private http = inject(HttpClient);

  searchCities(cityNameAndCode: string): Observable<any> {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityNameAndCode}&limit=20&appid=${webApiKey}`
    );
  }
}

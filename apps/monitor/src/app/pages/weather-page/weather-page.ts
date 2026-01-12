import { Component, inject, DestroyRef } from '@angular/core';
import { DatePipe, AsyncPipe } from '@angular/common';
import {
  interval,
  map,
  startWith,
  forkJoin,
  switchMap,
  filter
} from 'rxjs';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectToMonitor } from '../../../../../../store/selected-city/selected-city.selector';
import { ListCitynames } from '../../services/cityNames/list-citynames';

@Component({
  selector: 'app-weather-page',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './weather-page.html',
  styles: ``,
})
export class WeatherPage {
  private store = inject(Store);
  private cityService = inject(ListCitynames);
  destroyRef$ = inject(DestroyRef);

  cityName$ = this.store.select(selectToMonitor);

  weatherAndAirQuality$ = this.cityName$.pipe(
    filter((cityName) => cityName !== null),
    switchMap((cityName) =>
      forkJoin({
        airQuality: this.cityService.getCityAirQuality(cityName),
        weather: this.cityService.getCityWeatherData(cityName),
      })
    ),
    takeUntilDestroyed(this.destroyRef$)
  );

  time$ = this.weatherAndAirQuality$
    .pipe(
      map(({ weather }) => weather?.response[0]?.periods[0]?.timestamp),
      switchMap((baseTime) =>
        interval(1000).pipe(
          startWith(0),
          map((tick) => new Date((baseTime + tick)*1000))
        )
      ),
      takeUntilDestroyed(this.destroyRef$)
    )

  airQualityData$ = this.weatherAndAirQuality$.pipe(
    map(({ airQuality }) => ({
      aqi: airQuality?.response[0]?.periods[0]?.aqi,
      category: airQuality?.response[0]?.periods[0]?.category,
      color: airQuality?.response[0]?.periods[0]?.color,
      pollutants: airQuality?.response[0]?.periods[0]?.pollutants,
    }))
  );
}

import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ListCitynames } from './services/cityNames/list-citynames';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
  iif,
  tap,
  map,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectCity } from '../../../../store/selected-city/selected-city.actions';
import { AsyncPipe } from '@angular/common';

export interface CityDetails {
  country: string;
  lat: number;
  local_names: any;
  lon: number;
  name: string;
  state: string;
}

export interface City {
  countryCode: string;
  name: string;
  lat: number;
}

@Component({
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private getCityNames = inject(ListCitynames);
  private destroyRef$ = inject(DestroyRef);
  private store = inject(Store);

  private loading = signal<boolean>(false);
  cityNameResults = signal<City[]>([]);
  private errorStatus = signal<string>('');
  showSuggestions = signal(true);

  searchCityControl = new FormControl('');

  ngOnInit(): void {
    this.searchCityNames();
  }

  searchCityNames(): void {
    this.loading.set(true);
    this.searchCityControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchedCity: string | null) => {
          const city = searchedCity ?? '';
          return iif(
            () => city.length > 2,
            this.getCityNames.searchCities(city).pipe(
              map((cityNames) =>
                cityNames.map((city: CityDetails) => ({
                  name: city.name,
                  countryCode: city.country,
                  lat: city.lat,
                }))
              )
            ),
            of([])
          );
        }),
        tap({ complete: () => this.loading.set(false) }),
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe({
        next: (value) => {
          this.cityNameResults.set(value);
        },
        error: (error) => this.errorStatus.set(error),
      });
  }

  selectCityToSearch(citylat: number) {
    const selectedCity = this.cityNameResults().find(
      (city) => city.lat === citylat
    );
    if (!selectedCity) return;
    this.searchCityControl.setValue(
      `${selectedCity.name},${selectedCity.countryCode}`
    );
    this.store.dispatch(
      selectCity({
        newCity: `${selectedCity.name},${selectedCity.countryCode}`,
      })
    );
    this.showSuggestions.set(false);
    return selectedCity;
  }
}

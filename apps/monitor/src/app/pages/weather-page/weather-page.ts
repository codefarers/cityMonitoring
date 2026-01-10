import { Component } from '@angular/core';
import { MonitorWeatherCard } from '@monitor/components';
import { DatePipe } from '@angular/common';
import { interval, map, Observable, startWith } from 'rxjs';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather-page',
  imports: [MonitorWeatherCard, DatePipe],
  templateUrl: './weather-page.html',
  styles: ``,
})
export class WeatherPage {
  timeNow = new Date();

  time$: Observable<Date> = interval(1000).pipe(
    startWith(''),
    map(() => new Date()),
    takeUntilDestroyed()
  );

  readonly currentTime = toSignal(this.time$);
}

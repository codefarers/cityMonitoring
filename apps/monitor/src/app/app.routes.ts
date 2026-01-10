import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'weather',
    loadComponent: () => import('./pages/weather-page/weather-page').then(m => m.WeatherPage),
  },
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
  }
];

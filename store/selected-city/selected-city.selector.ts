import { createSelector, createFeatureSelector } from '@ngrx/store';
import { monitoredCity } from './selected-city.state';

export const selectMonitorState = createFeatureSelector<monitoredCity>('app');

export const selectToMonitor = createSelector(
  selectMonitorState,
  (state: monitoredCity)=> state.cityName
)

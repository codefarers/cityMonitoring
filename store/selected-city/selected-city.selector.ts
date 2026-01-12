import { createSelector, createFeatureSelector } from '@ngrx/store';
import { monitorState } from './selected-city.state';

export const selectMonitorState = createFeatureSelector<monitorState>('app');

export const selectToMonitor = createSelector(
  selectMonitorState,
  (state: monitorState) => state?.cityName
);

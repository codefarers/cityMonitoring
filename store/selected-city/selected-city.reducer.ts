import { createReducer, on } from '@ngrx/store';
import {selectCity} from './selected-city.actions';
import { initialCityValue } from './selected-city.state';

export const selectCityKey = 'selectedCity';

export const selectCityReducer = createReducer(
  initialCityValue,
  on(selectCity, (state, {newCity})=>({
    ...state,
    cityName: newCity
  }))
)

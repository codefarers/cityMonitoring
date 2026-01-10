import { createAction, props } from '@ngrx/store';

export const selectCity = createAction(
  '[Select Component] Select City',
  props<{newCity: string}>()
  );

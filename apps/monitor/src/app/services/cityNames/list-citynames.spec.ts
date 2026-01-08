import { TestBed } from '@angular/core/testing';

import { ListCitynames } from './list-citynames';

describe('ListCitynames', () => {
  let service: ListCitynames;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCitynames);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorWeatherCard } from './monitor-weather-card';

describe('MonitorWeatherCard', () => {
  let component: MonitorWeatherCard;
  let fixture: ComponentFixture<MonitorWeatherCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorWeatherCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorWeatherCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStackedBarChartComponent } from './icon-stacked-bar-chart.component';

describe('IconStackedBarChartComponent', () => {
  let component: IconStackedBarChartComponent;
  let fixture: ComponentFixture<IconStackedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconStackedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconStackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLineChartComponent } from './icon-line-chart.component';

describe('IconLineChartComponent', () => {
  let component: IconLineChartComponent;
  let fixture: ComponentFixture<IconLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

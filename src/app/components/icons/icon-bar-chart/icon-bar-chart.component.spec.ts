import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBarChartComponent } from './icon-bar-chart.component';

describe('IconBarChartComponent', () => {
  let component: IconBarChartComponent;
  let fixture: ComponentFixture<IconBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

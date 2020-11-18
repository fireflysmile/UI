import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMonitorComponent } from './icon-monitor.component';

describe('IconMonitorComponent', () => {
  let component: IconMonitorComponent;
  let fixture: ComponentFixture<IconMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

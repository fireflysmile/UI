import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAlertComponent } from './icon-alert.component';

describe('IconAlertComponent', () => {
  let component: IconAlertComponent;
  let fixture: ComponentFixture<IconAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

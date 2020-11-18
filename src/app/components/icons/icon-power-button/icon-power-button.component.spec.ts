import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPowerButtonComponent } from './icon-power-button.component';

describe('IconPowerButtonComponent', () => {
  let component: IconPowerButtonComponent;
  let fixture: ComponentFixture<IconPowerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPowerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPowerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

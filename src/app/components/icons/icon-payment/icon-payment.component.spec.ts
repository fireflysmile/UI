import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPaymentComponent } from './icon-payment.component';

describe('IconPaymentComponent', () => {
  let component: IconPaymentComponent;
  let fixture: ComponentFixture<IconPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

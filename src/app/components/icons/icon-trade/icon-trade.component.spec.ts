import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTradeComponent } from './icon-trade.component';

describe('IconTradeComponent', () => {
  let component: IconTradeComponent;
  let fixture: ComponentFixture<IconTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCardComponent } from './trade-card.component';

describe('TradeCardComponent', () => {
  let component: TradeCardComponent;
  let fixture: ComponentFixture<TradeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

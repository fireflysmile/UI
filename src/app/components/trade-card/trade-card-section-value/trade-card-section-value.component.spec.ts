import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCardSectionValueComponent } from './trade-card-section-value.component';

describe('TradeCardSectionValueComponent', () => {
  let component: TradeCardSectionValueComponent;
  let fixture: ComponentFixture<TradeCardSectionValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCardSectionValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCardSectionValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

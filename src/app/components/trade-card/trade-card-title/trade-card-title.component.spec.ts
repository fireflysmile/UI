import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCardTitleComponent } from './trade-card-title.component';

describe('TradeCardTitleComponent', () => {
  let component: TradeCardTitleComponent;
  let fixture: ComponentFixture<TradeCardTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCardTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

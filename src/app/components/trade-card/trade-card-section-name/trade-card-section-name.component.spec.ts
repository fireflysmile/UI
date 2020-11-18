import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCardSectionNameComponent } from './trade-card-section-name.component';

describe('TradeCardSectionNameComponent', () => {
  let component: TradeCardSectionNameComponent;
  let fixture: ComponentFixture<TradeCardSectionNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCardSectionNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCardSectionNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

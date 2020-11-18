import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModificationOverviewBaseComponent } from './order-modification-overview-base.component';

describe('OrderModificationOverviewBaseComponent', () => {
  let component: OrderModificationOverviewBaseComponent;
  let fixture: ComponentFixture<OrderModificationOverviewBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderModificationOverviewBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModificationOverviewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

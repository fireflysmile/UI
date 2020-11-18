import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../divider/divider.module';
import { DivisionCardModule } from '../division-card/division-card.module';
import { OtrAllocationStatusModule } from '../icons/otr-allocation-status/otr-allocation-status.module';
import { OtrRequestSummaryModule } from '../otr-request-summary/otr-request-summary.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { ToggleFilterModule } from '../toggle-filter/toggle-filter.module';

import { OtrOverviewComponent } from './otr-overview.component';

describe('OtrOverviewComponent', () => {
  let component: OtrOverviewComponent;
  let fixture: ComponentFixture<OtrOverviewComponent>;
  let orderService: OrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtrOverviewComponent],
      imports: [
        TestSharedModule,
        ToggleFilterModule,
        RectCardModule,
        OtrRequestSummaryModule,
        DivisionCardModule,
        DividerModule,
        OtrAllocationStatusModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrOverviewComponent);
    orderService = TestBed.inject(OrderService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create order allocation summary', () => {
    spyOn(orderService, 'getOrderAllocationSummary').and.returnValue(of(null));
    spyOn(orderService, 'getOrderAllocationStatus').and.returnValue(of(null));
    component.getData();
    expect(component.institutional).toBeFalsy();
  });
});

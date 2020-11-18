import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/api/order.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../divider/divider.module';
import { DivisionCardModule } from '../division-card/division-card.module';
import { PcModificationStatusModule } from '../pc-modification-status/pc-modification-status.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { RequestStatusBarModule } from '../request-status-bar/request-status-bar.module';
import { ToggleFilterModule } from '../toggle-filter/toggle-filter.module';

import { PcOverviewComponent } from './pc-overview.component';

describe('PcOverviewComponent', () => {
  let component: PcOverviewComponent;
  let fixture: ComponentFixture<PcOverviewComponent>;
  let orderService: OrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcOverviewComponent],
      imports: [
        TestSharedModule,
        ToggleFilterModule,
        RectCardModule,
        RequestStatusBarModule,
        DivisionCardModule,
        DividerModule,
        PcModificationStatusModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcOverviewComponent);
    orderService = TestBed.inject(OrderService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get modification summary', () => {
    spyOn(
      orderService,
      'getOrderModificationSummary'
    ).and.returnValue(
      of({
        successful: 10,
        modificationUnderProcess: 15,
        autoModificationUnderProcess: 15,
        unsuccessful: 15,
        cashMarkets: {
          pending: 15,
          modified: 15,
        },
        futureAndOptions: {
          pending: 15,
          modified: 15,
        },
        currencyDerivatives: {
          pending: 15,
          modified: 15,
        },
      })
    );

    component.getModificationSummary(false);
    expect((component as any)._summary).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../../form-field/form-field.module';
import { ModalModule } from '../../modal/modal.module';
import { WaterfallBarChartModule } from '../waterfall-bar-chart/waterfall-bar-chart.module';

import { OtrAllocationStatusComponent } from './otr-allocation-status.component';

describe('OtrAllocationStatusComponent', () => {
  let component: OtrAllocationStatusComponent;
  let fixture: ComponentFixture<OtrAllocationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtrAllocationStatusComponent],
      imports: [
        TestSharedModule,
        ModalModule,
        FormFieldModule,
        WaterfallBarChartModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrAllocationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create data', () => {
    component.data = null;
    expect(component.chartData).toBeTruthy();
    component.chartData = null;
    component.data = {
      unallocated: 20,
      allocated: {
        unconfirmed: 90,
        rejected: 7,
        confirmed: 122,
        deConfirmed: 122,
      },
    };
    expect(component.chartData).toBeTruthy();
  });
});

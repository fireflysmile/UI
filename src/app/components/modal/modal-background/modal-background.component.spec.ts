import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { WaterfallBarChartModule } from '../../icons/waterfall-bar-chart/waterfall-bar-chart.module';

import { ModalBackgroundComponent } from './modal-background.component';

describe('ModalBackgroundComponent', () => {
  let component: ModalBackgroundComponent;
  let fixture: ComponentFixture<ModalBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBackgroundComponent],
      imports: [TestSharedModule, WaterfallBarChartModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

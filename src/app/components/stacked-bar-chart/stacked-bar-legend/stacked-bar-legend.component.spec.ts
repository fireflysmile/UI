import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarLegendComponent } from './stacked-bar-legend.component';
import { By } from '@angular/platform-browser';
import { PageTitleModule } from '../../page-title/page-title.module';
import { ViewToggleModule } from '../../view-toggle/view-toggle.module';
import { OtrOverviewModule } from '../../otr-overview/otr-overview.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { OtrOverviewTableModule } from '../../otr-overview-table/otr-overview-table.module';

describe('StackedBarLegendComponent', () => {
  let component: StackedBarLegendComponent;
  let fixture: ComponentFixture<StackedBarLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackedBarLegendComponent],
      imports: [
        TestSharedModule,
        PageTitleModule,
        ViewToggleModule,
        OtrOverviewModule,
        OtrOverviewTableModule,
        ViewToggleModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct color', () => {
    component.color = 'red';
    const colorLegend = fixture.debugElement.query(
      By.css('.cm-stacked-bar-chart-legend-color')
    ).nativeElement;
    expect(colorLegend.style.backgroundColor).toEqual('red');
  });
});

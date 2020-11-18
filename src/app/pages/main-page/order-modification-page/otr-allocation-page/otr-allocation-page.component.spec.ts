import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OtrOverviewTableModule } from 'src/app/components/otr-overview-table/otr-overview-table.module';
import { OtrOverviewModule } from 'src/app/components/otr-overview/otr-overview.module';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { ViewToggleModule } from 'src/app/components/view-toggle/view-toggle.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { OtrAllocationPageComponent } from './otr-allocation-page.component';

describe('OtrAllocationPageComponent', () => {
  let component: OtrAllocationPageComponent;
  let fixture: ComponentFixture<OtrAllocationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtrAllocationPageComponent],
      imports: [
        TestSharedModule,
        PageTitleModule,
        ViewToggleModule,
        OtrOverviewModule,
        OtrOverviewTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrAllocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

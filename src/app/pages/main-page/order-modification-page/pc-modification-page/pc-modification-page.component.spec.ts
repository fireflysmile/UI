import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { PcModificationFooterModule } from 'src/app/components/pc-modification-footer/pc-modification-footer.module';
import { PcModificationTableModule } from 'src/app/components/pc-modification-table/pc-modification-table.module';
import { PcOverviewModule } from 'src/app/components/pc-overview/pc-overview.module';
import { ViewToggleModule } from 'src/app/components/view-toggle/view-toggle.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { PcModificationPageComponent } from './pc-modification-page.component';

describe('PcModificationPageComponent', () => {
  let component: PcModificationPageComponent;
  let fixture: ComponentFixture<PcModificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcModificationPageComponent],
      imports: [
        TestSharedModule,
        ViewToggleModule,
        PcOverviewModule,
        PcModificationTableModule,
        PcModificationFooterModule,
        PageTitleModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcModificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

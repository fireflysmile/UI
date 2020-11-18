import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleModule } from '../../page-title/page-title.module';
import { PcModificationFooterModule } from '../../pc-modification-footer/pc-modification-footer.module';
import { PcModificationTableModule } from '../../pc-modification-table/pc-modification-table.module';
import { PcOverviewModule } from '../../pc-overview/pc-overview.module';
import { ViewToggleModule } from '../../view-toggle/view-toggle.module';

import { IconAssignmentComponent } from './icon-assignment.component';

describe('IconAssignmentComponent', () => {
  let component: IconAssignmentComponent;
  let fixture: ComponentFixture<IconAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconAssignmentComponent],
      imports: [
        PageTitleModule,
        ViewToggleModule,
        PcOverviewModule,
        PcModificationTableModule,
        PcModificationFooterModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

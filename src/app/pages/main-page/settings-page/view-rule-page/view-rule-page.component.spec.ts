import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageActionsModule } from 'src/app/components/page-actions/page-actions.module';
import { PageTitleModule } from 'src/app/components/page-title/page-title.module';
import { PcCodeRulesModule } from 'src/app/components/pc-code-rules/pc-code-rules.module';
import { RulesFilterModule } from 'src/app/components/rules-filter/rules-filter.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { ViewRulePageComponent } from './view-rule-page.component';

describe('ViewRulePageComponent', () => {
  let component: ViewRulePageComponent;
  let fixture: ComponentFixture<ViewRulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRulePageComponent],
      imports: [
        TestSharedModule,
        PageTitleModule,
        RulesFilterModule,
        PcCodeRulesModule,
        PageActionsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

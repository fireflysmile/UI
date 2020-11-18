import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageActionsModule } from 'src/app/components/page-actions/page-actions.module';
import { SetRulesModule } from 'src/app/components/set-rules/set-rules.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { SetRulePageComponent } from './set-rule-page.component';

describe('SetRulePageComponent', () => {
  let component: SetRulePageComponent;
  let fixture: ComponentFixture<SetRulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetRulePageComponent],
      imports: [TestSharedModule, SetRulesModule, PageActionsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../divider/divider.module';

import { PcCodeRuleDetailComponent } from './pc-code-rule-detail.component';

describe('PcCodeRuleDetailComponent', () => {
  let component: PcCodeRuleDetailComponent;
  let fixture: ComponentFixture<PcCodeRuleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcCodeRuleDetailComponent],
      imports: [TestSharedModule, DividerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcCodeRuleDetailComponent);
    component = fixture.componentInstance;
    component.data = {
      membersTradingPermitted: [],
      prohibitedSecurities: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data', () => {
    component.addMemberTrading();
    expect(component.data.membersTradingPermitted.length).toBeTruthy();
    component.addProhibitedSecurity();
    expect(component.data.prohibitedSecurities.length).toBeTruthy();
    component.removeMemberTrading(component.data.membersTradingPermitted[0]);
    expect(component.data.membersTradingPermitted.length).toEqual(0);
    component.removeProhibitedSecurity(component.data.prohibitedSecurities[0]);
    expect(component.data.prohibitedSecurities.length).toEqual(0);
  });
});

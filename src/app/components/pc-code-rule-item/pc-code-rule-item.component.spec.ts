import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcCodeRuleItemComponent } from './pc-code-rule-item.component';

describe('PcCodeRuleItemComponent', () => {
  let component: PcCodeRuleItemComponent;
  let fixture: ComponentFixture<PcCodeRuleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcCodeRuleItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcCodeRuleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data', () => {
    component.data = null;
    expect(component.marginAmount).toEqual('0.00');

    component.data = {
      pcCode: 'string',
      pcCodeLevelMargin: 1,
      marginAmount: 1,
      rules: [],
      checked: false,
    };
    expect(component.data.pcCode).toEqual('string');

    component.toggleCheckedState(true);
    expect(component.expanded).toEqual(true);

    component.toggleCheckedState(false);
    expect(component.expanded).toEqual(true);
  });

  it('should update margin ammount', () => {
    component.data = {
      pcCode: 'string',
      pcCodeLevelMargin: 1,
      marginAmount: 1,
      rules: [],
      checked: false,
    };
    component.updateMarginAmount('10');
    expect(component.data.marginAmount).toEqual(10);
    component.updateMarginAmount(null);
    expect(component.data.marginAmount).toEqual(0);
    component.updateMarginAmount('absc');
    expect(component.data.marginAmount).toEqual(0);
  });

  it('should remove unnecessary chars', () => {
    const input = {
      value: '1234abv',
    };
    component.removeUnnecessaryCharsOnInput({
      target: input,
    } as any);
    expect(input.value).toEqual('1234');
  });

  it('should delete rule', () => {
    component.data = {
      pcCode: 'string',
      pcCodeLevelMargin: 1,
      marginAmount: 1,
      rules: [
        {
          membersTradingPermitted: [],
          prohibitedSecurities: [],
        },
      ],
      checked: false,
    };
    component.deleteRule(component.data.rules[0]);
    expect(component.data.rules).toEqual([]);
  });
});

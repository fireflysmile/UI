import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcCodeRulesComponent } from './pc-code-rules.component';

describe('PcCodeRulesComponent', () => {
  let component: PcCodeRulesComponent;
  let fixture: ComponentFixture<PcCodeRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcCodeRulesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcCodeRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected rules', () => {
    component.data = [
      {
        pcCode: 'string',
        pcCodeLevelMargin: 1,
        marginAmount: 1,
        rules: [],
        checked: false,
      },
    ];
    expect(component.selectedRules.length).toEqual(0);
  });
});

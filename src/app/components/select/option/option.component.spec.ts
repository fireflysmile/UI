import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';

describe('OptionComponent', () => {
  let component: OptionComponent<string>;
  let fixture: ComponentFixture<OptionComponent<string>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionComponent) as ComponentFixture<
      OptionComponent<string>
    >;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.host).toBeTruthy();
  });

  it('should emit when click option', () => {
    const spyOnEmit = spyOn(component.optionClicked, 'emit');
    component.onHostClick();
    expect(spyOnEmit).toHaveBeenCalled();
  });

  it('should return label', () => {
    expect(component.label).toEqual('');
  });
});

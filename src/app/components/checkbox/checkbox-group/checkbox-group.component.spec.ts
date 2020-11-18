import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxGroupComponent } from './checkbox-group.component';
import { NgControl, FormControl } from '@angular/forms';
import { CheckboxComponent } from '../checkbox.component';

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent<boolean>;
  let fixture: ComponentFixture<CheckboxGroupComponent<boolean>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxGroupComponent],
    })
      .overrideComponent(CheckboxGroupComponent, {
        add: {
          providers: [
            {
              provide: NgControl,
              useClass: class extends NgControl {
                control = new FormControl();
                viewToModelUpdate() {}
              },
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CheckboxGroupComponent
    ) as ComponentFixture<CheckboxGroupComponent<boolean>>;
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update checkbox when change value', () => {
    const checkboxesSet = new Set();
    checkboxesSet.add({
      setDisable: () => {},
    } as CheckboxComponent<boolean>);
    component.checkboxes = checkboxesSet as any; // fake mock checkboxed list
    component.writeValue([true]);
    expect(component).toBeTruthy();
  });

  it('should set value when checkbox change', () => {
    const checkboxesSet = new Set() as any;
    checkboxesSet.add({
      setDisable: () => {},
    } as CheckboxComponent<boolean>);

    let checkCB;
    checkboxesSet.map = (checkCBTmp) => {
      checkCB = checkCBTmp;
      return [{ unsubscribe: () => {} }];
    };
    let checkCBChange;
    checkboxesSet.changes = {
      subscribe: (checkCBChangeTmp) => {
        checkCBChange = checkCBChangeTmp;
        return {
          unsubscribe: () => {},
        };
      },
      unsubscribe: () => {},
    };
    component.checkboxes = checkboxesSet as any; // fake mock checkboxed list
    component.ngAfterViewInit();

    const spyOnSetValue = spyOn(component, 'setValue');
    checkCBChange();
    let checkCBChange2;
    checkCB({
      checkedChange: {
        subscribe: (checkCBChange2Tmp) => (checkCBChange2 = checkCBChange2Tmp),
        unsubscribe: () => {},
      },
    });
    component.writeValue([true]);
    checkCBChange2(true);
    checkCBChange2(false);
    expect(spyOnSetValue).toHaveBeenCalledTimes(2);
  });

  it('should set disabled state', () => {
    component.checkboxes = null;
    component.setDisabledState(true);
    expect(component).toBeTruthy();
  });

  it('should update check state even when checkboxes are null', () => {
    component.checkboxes = null;
    component.writeValue([true]);
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { NgControl, FormControl } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent<boolean>;
  let fixture: ComponentFixture<CheckboxComponent<boolean>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      imports: [TestSharedModule],
    })
      .overrideComponent(CheckboxComponent, {
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
    fixture = TestBed.createComponent(CheckboxComponent) as ComponentFixture<
      CheckboxComponent<boolean>
    >;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call event when check the box', () => {
    const spyOnCheckedChange = spyOn(component.checkedChange, 'emit');
    const spyOnDisabled = spyOnProperty(component, 'disabled').and.returnValue(true);
    component.onHostClick();
    expect(spyOnCheckedChange).not.toHaveBeenCalled();

    spyOnDisabled.and.returnValue(false);
    component.onHostClick();
    expect(spyOnCheckedChange).toHaveBeenCalled();
  });
});

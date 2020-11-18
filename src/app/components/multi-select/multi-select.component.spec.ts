import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { SelectModule } from '../select/select.module';

import { MultiSelectComponent } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent<string>;
  let fixture: ComponentFixture<MultiSelectComponent<string>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectComponent],
      imports: [
        AutoCloserModule,
        SelectModule,
        CheckboxModule,
        AutoCloserModule,
        AutoPositionerModule,
        TestSharedModule,
      ],
    })
      .overrideComponent(MultiSelectComponent, {
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
    fixture = TestBed.createComponent(MultiSelectComponent) as ComponentFixture<
      MultiSelectComponent<string>
    >;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open/close options', () => {
    const spyOnDisabled = spyOnProperty(component, 'disabled').and.returnValue(
      true
    );
    component.openOptions();
    expect(component.opened).toEqual(false);

    spyOnDisabled.and.returnValue(false);
    component.openOptions();
    expect(component.opened).toEqual(true);

    component.closeOptions();
    expect(component.opened).toEqual(false);
  });

  it('should get/set correct value', () => {
    component.options = [
      {
        value: 'value1',
        label: 'value1',
        selected: false,
      },
      {
        value: 'value2',
        label: 'value2',
        selected: true,
      },
    ];
    component.setMultipleValue();
    expect(component.getValue().length).toEqual(1);
    component.clearSelection();
    expect(component.getValue().length).toEqual(0);

    component.options = [
      {
        value: 'value1',
        label: 'value1',
        selected: false,
      },
      {
        value: 'value2',
        label: 'value2',
        selected: true,
      },
      {
        value: 'value3',
        label: 'value3',
        selected: false,
      },
    ];
    component.writeValue(['value2']);
    expect(component.selectedLabel).toEqual('value2');
    component.writeValue(['value1', 'value2']);
    expect(component.selectedLabel).toEqual('Multiple');
    component.writeValue(['value1', 'value2', 'value3']);
    expect(component.selectedLabel).toEqual('All');
    component.contentOptions.notifyOnChanges();
  });

  it('should call set multiple value when click', () => {
    const spyOnSetMultipleValue = spyOn(component, 'setMultipleValue');
    (component as any).contentOptions = [
      {
        optionClicked: of('test'),
        value: 'test',
        label: 'test',
      },
    ];
    (component as any)._subscribeOptionClicked();
    expect(spyOnSetMultipleValue).toHaveBeenCalled();
    spyOnSetMultipleValue.calls.reset();

    component.options = [
      {
        value: 'test',
        label: 'test',
      },
    ];
    (component as any)._subscribeOptionClicked();
    expect(spyOnSetMultipleValue).toHaveBeenCalled();
    spyOnSetMultipleValue.calls.reset();
  });
});

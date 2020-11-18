import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NgControl, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { AutoScrollModule } from '../auto-scroll/auto-scroll.module';
import { OptionComponent } from './option/option.component';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent<any>;
  let fixture: ComponentFixture<SelectComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, OptionComponent],
      imports: [
        AutoCloserModule,
        AutoScrollModule,
        AutoPositionerModule,
        TestSharedModule,
      ],
    })
      .overrideComponent(SelectComponent, {
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
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open option', fakeAsync(() => {
    component.openOptions();
    expect(component.opened).toEqual(true);

    const spyOnDisable = spyOnProperty(component, 'disabled').and.returnValue(
      true
    );
    component.openOptions();
    expect(component.opened).toEqual(true);

    spyOnDisable.and.returnValue(false);
    component.closeOptions();
    expect(component.opened).toEqual(false);

    (component as any).contentOptions = [
      {
        optionClicked: of(true),
        value: 'test',
        label: 'test',
      },
    ];
    component.selectedValue = 'test';
    (component as any)._subscribeOptionClicked();
    (component as any)._setSelectedLabel();
    tick(1000);
    expect(component.selectedLabel).toEqual('test');
  }));

  it('should set correct value', fakeAsync(() => {
    const spyOnHasContentOptions = spyOnProperty(
      component,
      'hasContentOptions'
    ).and.returnValue(false);
    component.options = ['1', '2', '3'];
    fixture.detectChanges();
    component.openOptions();
    fixture.detectChanges();
    component.contentOptions.reset(component.viewOptions.toArray());
    component.contentOptions.notifyOnChanges();

    spyOnHasContentOptions.and.returnValue(true);
    component.ngAfterViewInit();
    tick();

    spyOnHasContentOptions.and.returnValue(false);
    component.ngAfterViewInit();
    tick();
    expect(component.selectedLabel).toEqual(undefined);

    component.contentOptions = null;
    component.ngAfterViewInit();
    tick();
    expect(component.selectedLabel).toEqual(undefined);

    const spyOnCloseOptions = spyOn(
      component,
      'closeOptions'
    ).and.callThrough();
    component.setValue('test', true);
    expect(spyOnCloseOptions).toHaveBeenCalled();
    spyOnCloseOptions.calls.reset();
    component.setValue('test');
    expect(spyOnCloseOptions).toHaveBeenCalled();
    spyOnCloseOptions.calls.reset();
    component.setValue('test', false);
    expect(spyOnCloseOptions).not.toHaveBeenCalled();
    spyOnCloseOptions.calls.reset();

    const options = ['option 1', 'option 2', 'option 3'];
    component.options = options;
    expect(component.filteredOptions).toEqual(options);
    component.isTypeahead = true;
    component.selectedValue = 'option 1';
    expect(component.filteredOptions).toEqual(['option 1']);
    component.isTypeahead = true;
    component.selectedValue = '';
    expect(component.filteredOptions).toEqual([]);
  }));
});

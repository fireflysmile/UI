import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ToggleFilterComponent } from './toggle-filter.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { NgControl, FormControl } from '@angular/forms';

describe('ToggleFilterComponent', () => {
  let component: ToggleFilterComponent;
  let fixture: ComponentFixture<ToggleFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleFilterComponent],
      imports: [TestSharedModule],
    })
      .overrideComponent(ToggleFilterComponent, {
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
    fixture = TestBed.createComponent(ToggleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set width', fakeAsync(() => {
    component.buttonWidth = 0;
    tick();
    expect(component.width).toEqual(null);
    component.buttonWidth = 10;
    tick();
    expect(component.width).toEqual('10px');
    component.options = [{ value: 'value', label: 'label' }];
    component.writeValue(null);
    expect(component.value).toEqual(null);

    component.buttonWidth = 'auto';
    tick();
    expect(component.width).toEqual(null);
    expect(component.autoWidth).toEqual(true);
  }));
});

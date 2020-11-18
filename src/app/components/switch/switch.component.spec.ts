import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, FormControl } from '@angular/forms';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchComponent],
      imports: [TestSharedModule],
    })
      .overrideComponent(SwitchComponent, {
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
    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value when host click', () => {
    const spyOnSetValue = spyOn(component, 'setValue');
    component.onHostClick();
    expect(spyOnSetValue).toHaveBeenCalled();
  });
});

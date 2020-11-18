import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, FormControl } from '@angular/forms';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { BooleanSelectorComponent } from './boolean-selector.component';

describe('BooleanSelectorComponent', () => {
  let component: BooleanSelectorComponent;
  let fixture: ComponentFixture<BooleanSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooleanSelectorComponent],
      imports: [TestSharedModule],
    })
      .overrideComponent(BooleanSelectorComponent, {
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
    fixture = TestBed.createComponent(BooleanSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

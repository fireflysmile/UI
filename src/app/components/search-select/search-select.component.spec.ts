import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { SearchSelectComponent } from './search-select.component';

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSelectComponent],
      imports: [TestSharedModule],
    })
      .overrideComponent(SearchSelectComponent, {
        add: {
          providers: [
            {
              provide: NgControl,
              useClass: class extends NgControl {
                control = new FormControl();
                viewToModelUpdate() {}
              } as any,
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set search value when close options', () => {
    component.selectedValue = 'test';
    component.closeOptions();
    expect(component.search).toEqual(component.selectedValue);
  });
});

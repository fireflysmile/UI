import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { MonthPickerComponent } from './month-picker.component';

describe('MonthPickerComponent', () => {
  let component: MonthPickerComponent;
  let fixture: ComponentFixture<MonthPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthPickerComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select correct date', () => {
    const testDate = new Date(2010, 7, 5);
    component.selected = testDate;
    expect(component.selectedMonth).toEqual('AUG');
    expect(component.selectedYear).toEqual(2010);

    const thisYear = new Date().getFullYear();
    component.selected = new Date(thisYear + 10, 7, 5);
    component.update();
    expect(component.selectedYear).toEqual(thisYear);

    const spyOnSelectedChange = spyOn(component.selectedChange, 'emit');
    component.selected = new Date(thisYear - 2, 7, 5);
    component.update();
    expect(spyOnSelectedChange).toHaveBeenCalled();
    spyOnSelectedChange.calls.reset();

    const testSmallDate = new Date(201, 7, 5);
    component.selected = testSmallDate;
    component.update();
    expect(spyOnSelectedChange).not.toHaveBeenCalled();

    component.selected = new Date(thisYear - 2, 7, 5);
    component.selectedMonth = null;
    component.update();
    expect(spyOnSelectedChange).toHaveBeenCalled();
    spyOnSelectedChange.calls.reset();

  });
});

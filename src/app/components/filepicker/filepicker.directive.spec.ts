import { Component, ViewChild, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilepickerDirective } from './filepicker.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div #cdire="appFilepickerDirective" appFilepicker></div>`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: FilepickerDirective;
}

describe('FilepickerDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, FilepickerDirective],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    component.element.fileTypes = 'newFileTypes';
    component.element.ngAfterViewInit();
    expect(component).toBeTruthy();
  });

  it('should show file picker when click to component', () => {
    const newEvent = new Event('build');
    const spyOnPrevent = spyOn(newEvent, 'preventDefault');
    const spyOnClick = spyOn((component.element as any)._inputElement, 'click');
    component.element.onClick(newEvent);
    expect(spyOnClick).toHaveBeenCalled();
    expect(spyOnPrevent).toHaveBeenCalled();
    (component.element as any)._onFilesChanged();
    const spyOnFile = spyOn(component.element.file, 'emit');
    spyOnProperty(
      (component.element as any)._inputElement,
      'files'
    ).and.returnValue([{ test: 'test' }]);
    (component.element as any)._onFilesChanged();
    expect(spyOnFile).toHaveBeenCalled();
  });
});

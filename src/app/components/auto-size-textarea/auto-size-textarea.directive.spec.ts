import { AutoSizeTextareaDirective } from './auto-size-textarea.directive';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<textarea #cdire="appAutoSizeTextareaDirective" appAutoSizeTextarea> </textarea>`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: AutoSizeTextareaDirective;
}

describe('AutoSizeTextareaDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, AutoSizeTextareaDirective],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('textarea'));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct rows attribute when resize', fakeAsync(() => {
    let count = 100;
    spyOnProperty(elementRef.nativeElement, 'scrollHeight').and.callFake((value) => {
      count -= 1;
      return count;
    });
    spyOnProperty(elementRef.nativeElement, 'offsetHeight').and.returnValue(10);
    elementRef.nativeElement.setAttribute('rows', '10');
    elementRef.nativeElement.oninput();
    expect(elementRef.nativeElement.getAttribute('rows')).toEqual('99');
  }));
});

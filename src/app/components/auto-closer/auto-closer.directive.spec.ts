import { AutoCloserDirective } from './auto-closer.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<div #cdire="appAutoCloserDirective" appAutoCloser></div>`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: AutoCloserDirective;
}

describe('AutoCloserDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;
  const event: any = {};

  beforeEach(() => {
    document.addEventListener = (eventName, action) => {
      event[eventName] = action;
    };
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, AutoCloserDirective],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    elementRef = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should add scroll event when set closeOnScroll', () => {
    const spyOnAddEventListener = spyOn(
      document,
      'addEventListener'
    ).and.callThrough();
    component.element.closeOnScroll = false;
    fixture.detectChanges();
    expect(spyOnAddEventListener).not.toHaveBeenCalled();

    component.element.closeOnScroll = true;
    fixture.detectChanges();
    expect(spyOnAddEventListener).toHaveBeenCalled();
  });

  it('should get correct host and container', () => {
    expect(component.element.host).toEqual(elementRef.nativeElement);

    component.element.closerContainer = elementRef.nativeElement;
    expect(component.element.container).toEqual(elementRef.nativeElement);
  });

  it('should call autoclose if  click outside', () => {
    component.element.closeOnScroll = true;
    const spyOnAutoClose = spyOn(
      component.element.autoClose,
      'emit'
    ).and.callThrough();
    const spyOnContainer = spyOnProperty(
      component.element,
      'container'
    ).and.returnValue({
      contains: () => true,
    });
    spyOnProperty(component.element, 'host').and.returnValue({
      contains: () => false,
    });
    // scroll event
    event.scroll({
      type: 'scroll',
      stopPropagation: () => {},
      preventDefault: () => {},
    });
    expect(spyOnAutoClose).not.toHaveBeenCalled();
    // wheel event
    event.wheel({
      type: 'wheel',
      stopPropagation: () => {},
      preventDefault: () => {},
    });
    expect(spyOnAutoClose).not.toHaveBeenCalled();
    // any event
    event.scroll({
      type: 'test',
      stopPropagation: () => {},
      preventDefault: () => {},
    });
    expect(spyOnAutoClose).not.toHaveBeenCalled();

    spyOnContainer.and.returnValue({
      contains: () => false,
    });
    // wheel event
    event.wheel({
      type: 'wheel',
      stopPropagation: () => {},
      preventDefault: () => {},
    });
    expect(spyOnAutoClose).toHaveBeenCalled();
  });
});

import { Component, DebugElement, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getElement, getStyle } from './element.util';

@Component({
  template: `<div id="component"></div>`,
})
class TestComponent {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

describe('Element Util', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let elementRef: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('div'));
  });

  it('should get element', () => {
    expect(getElement(component.elementRef)).toEqual(
      component.elementRef.nativeElement
    );
    expect(getElement(component.elementRef.nativeElement)).toEqual(
      component.elementRef.nativeElement
    );
    expect(getElement(null)).toEqual(undefined);
    component.elementRef.nativeElement = null;
    expect(getElement(component.elementRef)).toEqual(undefined);
  });

  it('should get element style', () => {
    expect(getStyle(component.elementRef.nativeElement, 'display')).toEqual(
      'block'
    );
  });
});

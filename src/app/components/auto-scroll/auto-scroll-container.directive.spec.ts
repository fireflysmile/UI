import { AutoScrollContainerDirective } from './auto-scroll-container.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div
    #cdire="appAutoScrollContainerDirective"
    appAutoScrollContainer
  >
    <div class="ts-auto-scroll-item">test</div>
    <div class="ts-auto-scroll-item">test</div>
    <div *ngIf="shouldShowFocusElement" class="ts-auto-scroll-item ts-auto-scroll-focused">test</div>
    <div class="ts-auto-scroll-item">test</div>
  </div>`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: AutoScrollContainerDirective;

  shouldShowFocusElement = true;
}

describe('AutoScrollContainerDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, AutoScrollContainerDirective],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    spyOnProperty(elementRef.nativeElement, 'offsetHeight').and.returnValue(
      100
    );
    spyOnProperty(elementRef.nativeElement, 'scrollHeight').and.returnValue(
      200
    );
    component.element.ngAfterViewInit();
    expect(component).toBeTruthy();
    expect(elementRef.nativeElement.scrollTop).toEqual(0);
    expect(elementRef.nativeElement.scrollLeft).toEqual(0);

    component.shouldShowFocusElement = false;
    fixture.detectChanges();
    component.element.ngAfterViewInit();
    expect(elementRef.nativeElement.scrollTop).toEqual(0);
    expect(elementRef.nativeElement.scrollLeft).toEqual(0);
  });
});

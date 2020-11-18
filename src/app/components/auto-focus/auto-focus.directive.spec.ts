import { AutoFocusDirective } from './auto-focus.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appAutoScrollContainer></div>`,
})
class TestDirectiveComponent {}

describe('AutoFocusDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, AutoFocusDirective],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    elementRef = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});

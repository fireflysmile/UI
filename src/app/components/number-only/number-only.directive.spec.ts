import { NumberOnlyDirective } from './number-only.directive';
import * as _ from 'lodash';
import { By } from '@angular/platform-browser';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<input #cdire="appNumberOnlyDirective" appNumberOnly value="" />`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: NumberOnlyDirective;
}

describe('NumberOnlyDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, NumberOnlyDirective],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call prevent default with not number character', () => {
    let newEvent = new KeyboardEvent('a', {
      key: 'a',
    });
    let spyOnPrevent = spyOn(newEvent, 'preventDefault');
    component.element.onKeyDown(newEvent);
    expect(spyOnPrevent).toHaveBeenCalled();
    spyOnPrevent.calls.reset();

    newEvent = new KeyboardEvent('1', {
      key: '1',
    });
    spyOnPrevent = spyOn(newEvent, 'preventDefault');
    component.element.onKeyDown(newEvent);
    expect(spyOnPrevent).not.toHaveBeenCalled();
    spyOnPrevent.calls.reset();

    _.forEach(['v', 'x', 'a', 'c', 'v', 'x'], (key) => {
      newEvent = new KeyboardEvent('1', {
        key,
        ctrlKey: true,
        metaKey: true,
      });
      spyOnPrevent = spyOn(newEvent, 'preventDefault');
      component.element.onKeyDown(newEvent);
      expect(spyOnPrevent).not.toHaveBeenCalled();
      spyOnPrevent.calls.reset();
    });

    _.forEach(['v', 'x', 'a', 'c', 'v', 'x'], (key) => {
      newEvent = new KeyboardEvent('1', {
        key,
        ctrlKey: false,
        metaKey: true,
      });
      spyOnPrevent = spyOn(newEvent, 'preventDefault');
      component.element.onKeyDown(newEvent);
      expect(spyOnPrevent).not.toHaveBeenCalled();
      spyOnPrevent.calls.reset();
    });

    component.element.maxLength = 100;
    component.element.ngOnInit();
    newEvent = new KeyboardEvent('a', {
      key: 'a',
      ctrlKey: true,
    });
    spyOnPrevent = spyOn(newEvent, 'preventDefault');
    component.element.onKeyDown(newEvent);
    expect(spyOnPrevent).not.toHaveBeenCalled();

    component.element.ngOnInit();
    newEvent = new KeyboardEvent('a', {
      key: 'c',
      ctrlKey: true,
    });
    spyOnPrevent = spyOn(newEvent, 'preventDefault');
    component.element.onKeyDown(newEvent);
    expect(spyOnPrevent).not.toHaveBeenCalled();
  });

  it('should paste input consists of only numbers', () => {
    const spyOnInsertText = spyOn(document, 'execCommand');
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text', 'abcd');
    component.element.onPaste(
      new ClipboardEvent('type', {
        clipboardData: dataTransfer,
      })
    );
    expect(spyOnInsertText).not.toHaveBeenCalled();

    dataTransfer.setData('text', '1234');
    component.element.onPaste(
      new ClipboardEvent('type', {
        clipboardData: dataTransfer,
      })
    );
    expect(spyOnInsertText).toHaveBeenCalled();
  });
});

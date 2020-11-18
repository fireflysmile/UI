import { AutoPositionerDirective } from './auto-positioner.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div #cdire="positioner" appAutoPositioner>
    AutoPositionerDirective
  </div>`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: AutoPositionerDirective;
}

describe('AutoPositionerDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;
  let positionChange;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, AutoPositionerDirective],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    elementRef = fixture.debugElement.query(By.css('div'));
    component.element.positionContainer = elementRef.nativeElement;

    window.requestAnimationFrame = (_observePositionChange) => {
      positionChange = _observePositionChange;
      return 0;
    };
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel watchers when destroy', () => {
    component.element.ngOnDestroy();
    expect(component).toBeTruthy();
  });

  it('should recalculate available position if position change', fakeAsync(() => {
    const spyOnContainer = spyOnProperty(
      component.element,
      'container'
    ).and.returnValue({
      getBoundingClientRect: () => ({
        top: 100,
        left: 100,
      }),
    });
    component.element.calculate();
    tick(500);
    fixture.detectChanges();

    component.element.width = '400';
    component.element.maxWidth = '300';
    spyOnContainer.and.returnValue({
      getBoundingClientRect: () => ({
        top: 200,
        left: 200,
      }),
    });
    positionChange();
    expect(elementRef.styles.left).toEqual('200px');
    expect(`${elementRef.styles['min-height']}`).toEqual('0px');
    expect(`${elementRef.styles['min-width']}`).toEqual('0px');
    expect(`${elementRef.styles['max-width']}`).toEqual('300px');
    expect(`${elementRef.styles.width}`).toEqual('400px');

    component.element.autoWidth = true;
    (component.element as any)._width = null;
    spyOn(component.element as any, '_getHorizontalPosition').and.returnValue(
      'left'
    );
    (component.element as any)._calculateAvailablePosition();
    expect(elementRef.styles.left).toEqual('200px');
  }));

  it('should get scroll container', () => {
    spyOnProperty(component.element, 'host').and.returnValue({
      parentElement: null,
    });
    expect(component.element.scrollContainer).toBeTruthy();
  });

  it('should get horizontal position', () => {
    const spyOnInnerWidth = spyOnProperty(window, 'innerWidth').and.returnValue(
      100
    );
    expect(
      (component.element as any)._getHorizontalPosition(
        { width: 100, height: 100 },
        {
          width: 100,
          left: 100,
        },
        {
          width: 100,
          left: -100000,
        }
      )
    ).toEqual('left');
    component.element.horizontalPriority = 'left';
    spyOnInnerWidth.and.returnValue(100000000);
    expect(
      (component.element as any)._getHorizontalPosition(
        { width: 100, height: 100 },
        {
          width: 100,
          left: 100,
        },
        {
          width: 10000000000,
          left: -100000,
        }
      )
    ).toEqual('left');
    spyOnInnerWidth.and.returnValue(100000000);
    component.element.horizontalPriority = 'auto';
    component.element.horizontalGap = 0;
    expect(
      (component.element as any)._getHorizontalPosition(
        { width: 100, height: 100 }, // hostSize
        {
          width: 100,
          left: 1000,
        }, // containerRect
        {
          width: 101101,
          left: -100000,
        } // scrollContainerRect
      )
    ).toEqual('left');
  });

  it('should get vertical position', () => {
    const spyOnInnerHeight = spyOnProperty(window, 'innerHeight').and.returnValue(
      100
    );
    expect(
      (component.element as any)._getVerticalPosition(
        { width: 100, height: 100 },
        {
          height: 100,
          top: 100,
        },
        {
          height: 100,
          top: -100000,
        }
      )
    ).toEqual('top');
    component.element.verticalPriority = 'top';
    expect(
      (component.element as any)._getVerticalPosition(
        { width: 100, height: 100 },
        {
          height: 100,
          top: 100,
        },
        {
          height: 100,
          top: -100000,
        }
      )
    ).toEqual('top');
    spyOnInnerHeight.and.returnValue(100000000);
    expect(
      (component.element as any)._getVerticalPosition(
        { width: 100, height: 100 },
        {
          height: 100,
          top: 100,
        },
        {
          height: 10000000000,
          top: -100000,
        }
      )
    ).toEqual('bottom');
    spyOnInnerHeight.and.returnValue(100000000);
    component.element.verticalPriority = 'auto';
    component.element.verticalGap = 0;
    expect(
      (component.element as any)._getVerticalPosition(
        { width: 100, height: 100 }, // hostSize
        {
          height: 100,
          top: 1000,
        }, // containerRect
        {
          height: 101101,
          top: -100000,
        } // scrollContainerRect
      )
    ).toEqual('top');
    component.element.verticalPriority = 'top';
    component.element.verticalGap = 0;
    expect(
      (component.element as any)._getVerticalPosition(
        { width: 100, height: 100 }, // hostSize
        {
          height: 100,
          top: 1000,
        }, // containerRect
        {
          height: 101101,
          top: -100000,
        } // scrollContainerRect
      )
    ).toEqual('top');
  });

  it('should stop propagation', () => {
    const event = new Event('');
    let stopPropagation = false;
    event.stopPropagation = () => {
      stopPropagation = true;
    };
    component.element.onHostScroll(event);
    expect(stopPropagation).toEqual(true);
  });
});

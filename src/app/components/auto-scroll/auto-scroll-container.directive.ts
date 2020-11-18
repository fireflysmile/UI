import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import {getElement} from '../../utils/element.util';
import {getOffsetPoints} from '../../utils/position.util';
import {noneArrayToArray} from '../../utils/object.util';
import {AUTO_SCROLL_CLASS, AUTO_SCROLL_FOCUS_CLASS} from './auto-scroll-item.directive';

@Directive({
  selector: '[appAutoScrollContainer]',
  exportAs: 'appAutoScrollContainerDirective',
})
export class AutoScrollContainerDirective implements AfterViewInit {
  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) { }

  ngAfterViewInit(): void {
    this.scrollToFocus();
  }

  /**
   * scroll to focused element
   */
  scrollToFocus(): void {
    const el = getElement(this.elementRef);
    const children = el.querySelectorAll(`.${AUTO_SCROLL_CLASS}`);

    if (el.offsetHeight < el.scrollHeight && children.length > 0) {
      // find focused item
      const focusedElement = noneArrayToArray(children).find(child => child.classList.contains(AUTO_SCROLL_FOCUS_CLASS));

      if (focusedElement) {
        // get offset points of element
        const elementPoints = getOffsetPoints(el);
        const focusedPoints = getOffsetPoints(focusedElement);

        // calculate to set element in center of container
        el.scrollTop = (focusedPoints.y + (focusedElement.offsetHeight / 2)) - (elementPoints.y + (el.offsetHeight / 2));
        el.scrollLeft = (focusedPoints.x + (focusedElement.offsetWidth / 2)) - (elementPoints.x + (el.offsetWidth / 2));
      }
    }
  }
}

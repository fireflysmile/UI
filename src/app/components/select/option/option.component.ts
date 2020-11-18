import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {getElement} from '../../../utils/element.util';
import {AutoScrollItemDirective} from '../../auto-scroll/auto-scroll-item.directive';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent<T> extends AutoScrollItemDirective implements OnInit {
  // value for option
  @Input() value: T;
  // selected state
  @Input() @HostBinding('class.ts-selected') selected = false;
  // emitted when host clicked
  @Output() optionClicked: EventEmitter<T> = new EventEmitter<T>();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  /**
   * return host element
   */
  get host(): HTMLElement {
    return getElement(this.elementRef);
  }

  /**
   * return inner text of host as label
   */
  get label(): string {
    return this.host.innerText.trim();
  }

  /**
   * emit option clicked with value
   */
  @HostListener('click')
  onHostClick(): void {
    this.optionClicked.emit(this.value);
  }
}

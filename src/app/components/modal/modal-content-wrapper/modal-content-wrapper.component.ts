import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {getElement} from '../../../utils/element.util';

@Component({
  selector: 'app-modal-content-wrapper',
  templateUrl: './modal-content-wrapper.component.html',
  styleUrls: ['./modal-content-wrapper.component.scss'],
  animations: [
    trigger('appear', [
      state('hidden', style({
        opacity: 0,
      })),
      state('visible', style({
        opacity: 1,
      })),
      transition('hidden => visible', animate('.3s ease-out')),
    ]),
  ],
})
export class ModalContentWrapperComponent implements OnInit, AfterViewInit {
  // viewContainerRef
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  // set appear state
  @HostBinding('@appear') get appear(): string {
    return this._visibility;
  }
  // visibility
  private _visibility = 'hidden';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit(): void {
  }

  /**
   * set visible
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._visibility = 'visible';
    });
  }

  /**
   * set modal id to header
   * @param id modal id
   */
  setModalIdToHeader(id: string): void {
    const el = getElement(this.elementRef);
    const header = el.querySelector('app-modal-header');

    if (header) {
      header.setAttribute('ts-modal-id', id);
    }
  }
}

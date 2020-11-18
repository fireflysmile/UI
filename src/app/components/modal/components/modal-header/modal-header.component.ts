import {Component, ElementRef, OnInit} from '@angular/core';
import {ModalService} from '../../modal.service';
import {getElement} from '../../../../utils/element.util';
import {NavigationEnd, Router} from '@angular/router';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ModalHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private elementRef: ElementRef<HTMLElement>,
    private modalService: ModalService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeRouterChanges();
  }

  /**
   * subscribe router changes
   */
  private _subscribeRouterChanges(): void {
    const sub = this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.closeModal();
        }
      });

    this.subscriptionService.store('_subscribeRouterChanges', sub);
  }

  /**
   * call modalService.close()
   */
  closeModal(): void {
    const el = getElement(this.elementRef);
    this.modalService.close(el.getAttribute('ts-modal-id'));
  }
}

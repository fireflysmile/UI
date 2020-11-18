import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription/subscription.service';

export interface ViewToggleItem {
  label: string;
  route: string | string[];
}

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.scss'],
  providers: [SubscriptionService],
})
export class ViewToggleComponent implements OnInit, AfterViewInit, OnDestroy {
  // routes
  @Input() routes: ViewToggleItem[] = [];
  // indicator
  @ViewChild('indicator', { static: false }) indicatorRef: ElementRef<
    HTMLElement
  >;
  // buttons
  @ViewChildren('button') buttonRefs: QueryList<ElementRef<HTMLButtonElement>>;
  // timer
  private timer;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this._subscribeRouterEvents();
  }

  ngAfterViewInit(): void {
    this._setIndicatorPosition();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  /**
   * subscribe router events
   */
  private _subscribeRouterEvents(): void {
    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._setIndicatorPosition();
      }
    });

    this.subscriptionService.store('_subscribeRouterEvents', sub);
  }

  /**
   * set indicator position according to router link
   */
  private _setIndicatorPosition(): void {
    clearInterval(this.timer);

    this.timer = setTimeout(() => {
      const indicator = this.indicatorRef.nativeElement;

      this.buttonRefs.forEach((buttonRef) => {
        const button = buttonRef.nativeElement;

        if (button.classList.contains('active')) {
          this.renderer.setStyle(indicator, 'left', `${button.offsetLeft}px`);
          this.renderer.setStyle(indicator, 'width', `${button.offsetWidth}px`);
        }
      });
    });
  }
}

import {Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

export type TsMessageType = 'success' | 'warn' | 'error';
export type TsMessageToastState = 'void' | 'toast' | 'toasted';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  animations: [
    trigger('toast', [
      state('toast', style({
        opacity: 1,
        marginTop: 0,
      })),
      state('void', style({
        opacity: 0,
        marginTop: -20,
      })),
      // use this when message cloned
      state('toasted', style({
        opacity: 1,
        marginTop: 0,
      })),
      transition('void => toast', animate('.15s ease-out')),
    ]),
  ]
})
export class MessageItemComponent implements OnInit, OnDestroy {
  // message
  @Input() message: string;
  // message type
  @Input() @HostBinding('attr.ts-type') type: TsMessageType;
  // message close emitter
  @Output() messageClose: EventEmitter<void> = new EventEmitter<void>();
  // bind animation
  @HostBinding('@toast') toast: TsMessageToastState = 'toast';
  // count
  private _count = 5;
  // timer
  private _timer;

  constructor() { }

  ngOnInit(): void {
    this._startCountdown();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * set count
   * @param count count
   */
  set count(count: number) {
    this._count = count;
  }

  /**
   * return count
   */
  get count(): number {
    return this._count;
  }

  /**
   * countdown only started when undo callback is set
   */
  private _startCountdown(): void {
    this._timer = setInterval(() => {
      this._count--;

      if (this._count <= 0) {
        this.messageClose.emit();
      }
    }, 1000);
  }
}

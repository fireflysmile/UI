import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-background',
  templateUrl: './modal-background.component.html',
  styleUrls: ['./modal-background.component.scss']
})
export class ModalBackgroundComponent implements OnInit {
  // background close emitter
  @Output() backgroundClose: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * emit background close event on host clicked
   */
  @HostListener('click')
  onHostClicked(): void {
    this.backgroundClose.emit();
  }
}

import { Component, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {

  constructor(private elemRef: ElementRef) { }

  ngAfterViewInit() {
    this._setMaxHeight();
  }

  @HostListener('window:resize') onResize() {
    this._setMaxHeight();
  }

  private _setMaxHeight() {
    const viewportHeight = this.elemRef.nativeElement.querySelector('.modal-backdrop').offsetHeight;
    const modalHeight = this.elemRef.nativeElement.querySelector('.modal').scrollHeight;
    if (modalHeight > viewportHeight - 100) {
      this.elemRef.nativeElement.querySelector('.modal').style.height = `${viewportHeight - 100}px`;
    }
  }

}

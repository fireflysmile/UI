import { Directive, ElementRef, AfterViewInit, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFilepicker]',
  exportAs: 'appFilepickerDirective',
})
export class FilepickerDirective implements AfterViewInit {

  @Input('appFilepicker') fileTypes: string;

  private _inputElement: HTMLInputElement;
  @Output() file = new EventEmitter<File>();

  constructor(private elemRef: ElementRef) { }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    this._inputElement.click();
  }

  ngAfterViewInit() {
    this._inputElement = document.createElement('input');
    this._inputElement.type = 'file';
    if (this.fileTypes) {
      this._inputElement.accept = this.fileTypes;
    }
    this._inputElement.style.display = 'none';
    this._inputElement.addEventListener('change', this._onFilesChanged);

    this.elemRef.nativeElement.insertAdjacentElement('afterend', this._inputElement);
  }

  private _onFilesChanged = () => {
    const file = this._inputElement.files && this._inputElement.files[0];
    if (!file) { return; }
    this.file.emit(file);
  }

}

import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  exportAs: 'appNumberOnlyDirective',
})
export class NumberOnlyDirective implements OnInit  {

  @Input() maxLength: number;

  private regex: RegExp;
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.regex = this.maxLength ? new RegExp(`^-?[0-9]{0,${this.maxLength}}$`, 'g') : new RegExp(/^-?[0-9]*$/g);
  }

  // key down event handler.
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1 ||
    (key === 'a' && event.ctrlKey === true) || // Allow: Ctrl+A
    (key === 'c' && event.ctrlKey === true) || // Allow: Ctrl+C
    (key === 'v' && event.ctrlKey === true) || // Allow: Ctrl+V
    (key === 'x' && event.ctrlKey === true) || // Allow: Ctrl+X
    (key === 'a' && event.metaKey === true) || // Cmd+A (Mac)
    (key === 'c' && event.metaKey === true) || // Cmd+C (Mac)
    (key === 'v' && event.metaKey === true) || // Cmd+V (Mac)
    (key === 'x' && event.metaKey === true)) { // Cmd+X (Mac)
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  // paste event handler. will only allow if pasted input consists of only numbers.
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain');
    if (isNaN(pastedInput as any) !== true) {
      document.execCommand('insertText', false, pastedInput);
    }
  }
}

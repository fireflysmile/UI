import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appAutoSizeTextarea]',
  exportAs: 'appAutoSizeTextareaDirective',
})
export class AutoSizeTextareaDirective implements AfterViewInit {

  @Input('appAutoSizeTextarea') minRows: number;

  constructor(private elemRef: ElementRef<HTMLTextAreaElement>) { }

  ngAfterViewInit() {
    const elem = this.elemRef.nativeElement;
    this.minRows = this.minRows || 1;

    const resize = () => {
      const check = () => {
        elem.style.height = '0';
        const scrollHeight = elem.scrollHeight;
        elem.style.height = 'auto';

        const offsetHeight = elem.offsetHeight;

        if (scrollHeight > offsetHeight) { return 'small'; }
        if (scrollHeight < offsetHeight - 10) { return 'big'; }
        return 'adequate';
      };

      const rows = () => parseInt(elem.getAttribute('rows'), 0);

      while (check() === 'small') {
        elem.setAttribute('rows', `${rows() + 1}`);
      }
      while (check() === 'big' && rows() > this.minRows) {
        elem.setAttribute('rows', `${rows() - 1}`);
      }
    };

    setTimeout(() => {
      resize();
    });
    elem.oninput = () => resize();
  }

}

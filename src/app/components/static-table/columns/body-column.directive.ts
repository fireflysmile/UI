import {Directive, Input, TemplateRef} from '@angular/core';

/**
 * @usage
 * <ng-template
 *   tsBodyColumn
 *   let-row>
 *   // `let-row` reflects each row value
 * </ng-template>
 */
@Directive({
  selector: '[appBodyColumn]'
})
export class BodyColumnDirective {
  // key name
  @Input() key: string;

  constructor(
    public templateRef: TemplateRef<HTMLLIElement>,
  ) { }

}

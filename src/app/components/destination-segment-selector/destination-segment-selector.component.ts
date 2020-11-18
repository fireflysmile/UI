import {ChangeDetectorRef, Component, ElementRef, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {environment} from '../../../environments/environment';

const {
  segmentConfig,
} = environment;

@Component({
  selector: 'app-destination-segment-selector',
  templateUrl: './destination-segment-selector.component.html',
  styleUrls: ['./destination-segment-selector.component.scss']
})
export class DestinationSegmentSelectorComponent extends FormControlBaseDirective<string> implements OnInit {
  // selected value
  value: string;
  // options
  options: {
    label: string;
    value: string;
  }[] = Object.keys(segmentConfig).map(key => ({
    label: segmentConfig[key].label,
    value: segmentConfig[key].value,
  }));
  // selected option
  selectedOption: {label: string, value: string};
  // opened state
  opened = false;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: string): void {
    this.value = value;
    this._setSelectedOption();
  }

  /**
   * set selected option
   */
  private _setSelectedOption(): void {
    this.selectedOption = this.options.find(item => item.value === this.value);
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit
} from '@angular/core';
import {StackedBarColor, StackedBarData, StackedBarValue} from './stacked-bar/stacked-bar.component';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  // set data
  @Input() set data(data: StackedBarData[]) {
    this._data = data || [];
    this._createGridsWithThrottle();
  }
  // set step count
  @Input() set steps(steps: number) {
    this._steps = steps;
    this._createGridsWithThrottle();
  }
  // set colors
  @Input() set colors(colors: StackedBarColor[]) {
    this._colors = colors;
    this._createGridsWithThrottle();
  }
  @Input() showPercent = true;
  @Input() showLegend = true;
  @Input() showBarTotals = true;
  @Input() yAxisLabel: string;
  @Input() legendPrefix: string;
  @Input() legendAlign: 'left' | 'center' = 'center';
  @Input() clickable: boolean;

  @Output() selectionChange = new EventEmitter<void>();
  // default steps
  private _steps = 5;
  // data
  private _data: StackedBarData[] = [];
  // colors
  private _colors: StackedBarColor[] = [];
  // maximum value
  maximum = 0;
  // y labels
  yLabels: number[] = [];
  // grid throttle
  private _throttle;

  get anyBarSelected(): boolean {
    return this._data.some(d => d.values.some(v => v.selected));
  }

  constructor(
    private domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._createGridsWithThrottle();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    clearTimeout(this._throttle);
  }

  /**
   * return data
   */
  get data(): StackedBarData[] {
    return this._data;
  }

  /**
   * return colors
   */
  get colors(): StackedBarColor[] {
    return this._colors;
  }

  /**
   * create grids with throttle
   */
  private _createGridsWithThrottle(): void {
    clearTimeout(this._throttle);

    this._throttle = setTimeout(() => {
      this._setMaximumValue();
      this._createYLabels();
    });
  }

  /**
   * set maximum value for grid
   */
  private _setMaximumValue(): void {
    const totals = this._data
      .map(item => item.values.map(v => v.value).reduce((p, c) => p + c));

    const max = Math.max(...totals);

    const maxString = max.toString();
    let suppressCount = 1;
    let first = parseFloat(`${maxString[0]}.${maxString[1] || 0}`) / this._steps;

    while (first < 1 && first !== 0) {
      first = first * 10;
      suppressCount++;
    }

    let stepValue: string | number = Math.ceil(first);

    for (let i = 0; i < maxString.length - suppressCount; i++) {
      stepValue = stepValue + '0';
    }

    stepValue = parseInt(stepValue as string, null);

    this.maximum = stepValue * (this._steps + 1);
  }

  /**
   * create y labels
   */
  private _createYLabels(): void {
    this.yLabels = [];

    const step = this.maximum / this._steps;

    for (let i = 0; i < this._steps; i++) {
      let label = this.maximum - (step * i);
      label = isNaN(label) || label === 0 ? null : label;
      this.yLabels.push(Math.round(label * 10) / 10);
    }
  }

  /**
   * return grid position style string
   * @param index grid index
   */
  getGridPosition(index: number): SafeStyle {
    const style = `calc((100% / ${this._steps}) * ${index + 1})`;

    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  onToggleSelection(bars: StackedBarValue[]) {
    // get the list of currently selected bars
    const currentlySelected = [];
    this._data.forEach(d => {
      d.values.forEach(v => {
        if (v.selected) {
          currentlySelected.push(v);
        }
      });
    });
    // appropriately toggle the selected state
    if (currentlySelected.length === bars.length && bars.every(bar => currentlySelected.indexOf(bar) !== -1)) {
      // if all bars given as argument are already selected, then user wants to de-select
      bars.forEach(bar => {
        bar.selected = false;
      });
    } else {
      // else user wants to make a new selection
      this._data.forEach(d => {
        d.values.forEach(v => {
          v.selected = bars.indexOf(v) !== -1;
        });
      });
    }

    this.selectionChange.emit();
  }
}

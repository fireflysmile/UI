import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, HostListener,
  Input, OnDestroy,
  OnInit, Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {getElement} from '../../../utils/element.util';
import {sum} from '../../../utils/other.utils';

export interface WaterfallBarChartData {
  // value should be percent
  values: number[];
  // color
  colors: string[];
  // label
  label: string;
  // alert state
  alert?: boolean;
  // isolated data
  isolated?: boolean;
  // children
  children?: WaterfallBarChartData[];
}

export interface WaterfallBar {
  // start position
  start: number;
  // values
  values: number[];
  // total values
  total: string;
  // colors
  colors: string[];
  // label
  label: string;
  // width of dashed line
  width: number;
  // alert state
  alert: boolean;
}

@Component({
  selector: 'app-waterfall-bar-chart',
  templateUrl: './waterfall-bar-chart.component.html',
  styleUrls: ['./waterfall-bar-chart.component.scss']
})
export class WaterfallBarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  // waterfall bar chart data
  @Input() set data(data: WaterfallBarChartData) {
    this._data = data;
    this._createDisplayableData();
  }
  // label
  @Input() label: string;
  // emit when bar double clicked
  @Output() dataSelect: EventEmitter<WaterfallBar> = new EventEmitter<WaterfallBar>();
  // bar elements
  @ViewChildren('bar') barRefs: QueryList<ElementRef<HTMLElement>>;
  // bars
  bars: WaterfallBar[] = [];
  // data
  private _data: WaterfallBarChartData;
  // timer
  private _timer;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._setWidthOfDashedLines();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * create displayable data
   */
  private _createDisplayableData(): void {
    this.bars = [];

    if (this._data) {
      this._createWaterfallBars();
      this._setWidthWithDelay();
    }
  }

  /**
   * create waterfall bars to display chart
   * @param data data
   * @param previousTop previous top position
   * @param previousTotal previous total value
   */
  private _createWaterfallBars(data: WaterfallBarChartData = this._data, previousTop = 0, previousTotal = 0): void {
    const total = data.values.reduce(sum);
    // values in percent
    const values = data.values.map(value => {
      return previousTotal ? previousTotal * (value / 100) : value;
    });

    if (total) {
      // create chart only value is not 0
      this.bars.push({
        values,
        total: total.toFixed(0),
        start: data.isolated ? 100 - values.reduce(sum) : previousTop,
        colors: data.colors,
        label: data.label,
        alert: data.alert,
        width: 0,
      });
    }

    const previousItems: WaterfallBarChartData[] = [];

    (data.children || []).forEach(item => {
      let siblingEnd = 0;

      if (previousItems.length > 0) {
        siblingEnd = total * (this._getTotalValuesOfPreviousItems(previousItems) / 100);
      }

      this._createWaterfallBars(
        item,
        previousTop + siblingEnd,
        total,
      );

      previousItems.push(item);
    });
  }

  /**
   * get total value of previous items
   * @param previousItems previous sibling items
   */
  private _getTotalValuesOfPreviousItems = (previousItems: WaterfallBarChartData[]): number => {
    return previousItems
      // get total of values
      .map(prev => prev.values.reduce(sum))
      // sum total of previous items
      .reduce(sum);
  }

  /**
   * set width of dashed lines
   */
  private _setWidthOfDashedLines(): void {
    // previous bar
    let previousBar: HTMLElement;

    this.barRefs.forEach((barRef, index) => {
      const bar = getElement(barRef);

      if (previousBar && this.bars[index]) {
        this.bars[index].width = (bar.offsetLeft + bar.offsetWidth) - (previousBar.offsetLeft + previousBar.offsetWidth);
      }

      previousBar = bar;
    });

    this.changeDetectorRef.detectChanges();
  }

  /**
   * update dashed line width on window resize
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this._setWidthWithDelay();
  }

  /**
   * use setTimeout to wait for rendering time
   */
  private _setWidthWithDelay(): void {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this._setWidthOfDashedLines());
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {getElement} from '../../../utils/element.util';
import {sum} from '../../../utils/other.utils';

export interface StackedBarValue {
  // key for value
  key: string;
  // value
  value: number;
  // selected state
  selected?: boolean;
  // tooltip text
  tooltipText?: string;
}

export interface StackedBarData {
  // label
  label: string;
  // values
  values: StackedBarValue[];
  // set highlighted state
  highlighted?: boolean;
  // set highlighted label
  highlightedLabel?: string;
  // tooltip text
  tooltipText?: string;
  // full data
  fullData?: any;
}

export interface StackedBarColor {
  // key for color
  key: string;
  // color
  color: string;
}

export interface StackedBarRenderableBar {
  // value as percent
  percent: number;
  // color
  color: string;
  // label for bar
  label: string;
  // tooltip text
  tooltipText: string;
  // show tooltip
  showTooltip: boolean;
}

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.scss']
})
export class StackedBarComponent implements OnInit, AfterViewInit, OnDestroy {
  // set stacked bar data
  @Input() set data(data: StackedBarData) {
    this._data = data;
    this._createRenderableBarsWithThrottle();
  }
  // set the maximum value of chart
  @Input() set maximum(total: number) {
    this._maximum = total;
    this._createRenderableBarsWithThrottle();
  }
  // create color map when setting colors
  @Input() set colors(colors: StackedBarColor[]) {
    this._colorMap = {};

    (colors || []).forEach(item => {
      this._colorMap[item.key] = item.color;
    });

    this._createRenderableBarsWithThrottle();
  }
  @Input() showPercent = true;
  @Input() showBarTotal = true;
  @Input() clickable: boolean;
  @Input() dim: boolean; // whether to reduce opacity of bars by default (only selected bars to have opacity of 1)

  @Output() toggleSelection = new EventEmitter<StackedBarValue[]>();
  // stacked bars ref
  @ViewChild('stackedBarsWrapper') stackedBarsRef: ElementRef<HTMLElement>;
  // total value
  total = 0;
  // renderable bars
  renderableBars: StackedBarRenderableBar[] = [];
  // data
  private _data: StackedBarData;
  // total value
  private _maximum = 220;
  // color map
  private _colorMap = {};
  // throttle timer
  private _throttle;

  get anyBarSelected(): boolean {
    return this._data.values.some(v => v.selected);
  }
  public containerHover: boolean;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._createRenderableBarsWithThrottle();
  }

  ngOnDestroy(): void {
    clearTimeout(this._throttle);
  }

  /**
   * return data
   */
  get data(): StackedBarData {
    return this._data;
  }

  /**
   * set throttle to improve performance
   */
  private _createRenderableBarsWithThrottle(): void {
    clearTimeout(this._throttle);
    this._throttle = setTimeout(() => this._createRenderableBars());
  }

  /**
   * create renderable bars
   */
  private _createRenderableBars(): void {
    if (this._data) {
      this._setTotalValue();
      this._setHeight();
      this.renderableBars = (this._data.values || []).map(item => {
        const percent = (item.value / this.total) * 100;

        return {
          color: this._colorMap[item.key],
          label: Math.round(percent) + '%',
          percent,
          tooltipText: item.tooltipText,
          showTooltip: false
        };
      });

      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * set total value of current bar
   */
  private _setTotalValue(): void {
    const allData = (this._data.values || []);
    this.total = allData.length ? allData.map((item) => item.value).reduce(sum) : 0;
  }

  /**
   * set height of total bars
   */
  private _setHeight(): void {
    const el = getElement(this.stackedBarsRef);
    const height = this._maximum ? (this.total / this._maximum) * 100 : 0;
    this.renderer.setStyle(el, 'height', `${height}%`);
  }
}

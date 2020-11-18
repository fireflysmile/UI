import {Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import {getElement} from '../../utils/element.util';

export interface DonutChartData {
  label: string;
  value: number;
  color: string;
  selected?: boolean;
  // If you want provide a string of tooltip
  tooltipText?: string;
  // If you want provide a string array of tooltip
  tooltip?: string[];
}
export type DonutChartType =
'default'
| 'progress';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit, AfterViewInit {
  // data
  @Input() set data(data: DonutChartData[]) {
    this._data = data;
    setTimeout(() => {
      if (this._data) {
        this._draw();
      }
    });
  }
  @Input() showLabels = true;
  @Input() showTotal = true;
  @Input() showLegend: boolean;
  @Input() legendPrefix: string;
  @Input() clickable: boolean;

  @Output() selectionChange = new EventEmitter<void>();

  // chart type
  @Input() type: DonutChartType = 'default';
  // section tooltip type
  @Input() tooltipType = 'default';
  // canvas
  // @ViewChild('canvas') canvasRef: ElementRef<SVGElement>;
  @ViewChild('splitAnchor') inserAnchorRef: ElementRef<HTMLElement>;
    // canvas width
  @Input() set sWidth(d) {
    this._width = d;
  }
    // canvas height
  @Input() set sHeight(d) {
    this._height = d;
  }
  @Input() set sectionWidth(d) {
    this._sectionWidth = d;
  }

  @Input() centralLabel;
  @Input() centralColor = '#7B8591';


  @Output() sectionClick = new EventEmitter();
  @Output() sectionEnter = new EventEmitter();
  @Output() sectionLeave = new EventEmitter();

  _width = 380;
  _height = 270;
  _sectionWidth = 30;

  // data
  private _data: DonutChartData[] = [];
  // total value
  private _total = 0;
  // pi value
  private readonly _pi = Math.PI;
  // radius
  private _radius = 109;

  svg: any;

  ratio = 1;

  initFlag = false;

  constructor(
    private self: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this._draw();
  }

  ngOnInit() {
    this.initFlag = true;
  }

  /**
   * draw canvas
   */
  private _draw(): void {
    if (this._data && this.initFlag && this.inserAnchorRef) {
      this.ratio = this._width / 380;
      this._radius = 109 * this.ratio;
      this._clearChart();
      this._setTotalValue();
      this._createChart();
    }
  }

  get canvas(): d3.Selection<SVGElement, null, null, null> {
    // const el = getElement(this.canvasRef);

    // if (el) {
    //   return d3.select(el);
    // }

    if (!this.svg) {
      this.svg = d3.select(this.self.nativeElement).insert('svg', () => this.inserAnchorRef.nativeElement)
      .attr('width', this._width)
      .attr('height', this._height)
      .attr('viewBox', `0 0 ${this._width} ${this._height}`);
    }
    return this.svg;
  }

  get data(): DonutChartData[] {
    return this._data;
  }

  get anyArcsSelected(): boolean {
    return this.data.some(d => d.selected);
  }

  /**
   * set total value
   */
  private _setTotalValue(): void {
    this._total = this._data
      .map(item => item.value)
      .reduce((prev, current) => prev + current, 0);
  }

  /**
   * create chart
   */
  private _createChart(): void {
    let previousAngle = 0;
    const comp = this;

    const pie = d3.pie<any, DonutChartData>().sort(null).value(d => d.value);
    const data = pie(this._data);

    // create arc / label
    data.forEach(item => {
      const percent = item.value / this._total;
      const newAngle = previousAngle + (360 * percent);

      const arc = d3.arc()
        .innerRadius(this._radius - this._sectionWidth)
        // .innerRadius(this._radius - 30*this.ratio)
        .outerRadius(this._radius)
        .startAngle(0)
        .startAngle(this._degreeToRadian(previousAngle))
        .endAngle(this._degreeToRadian(newAngle));

      const outerArc = d3.arc()
        .innerRadius(this._radius + 10)
        .outerRadius(this._radius + 10);

      const pos = outerArc.centroid(item as any);
      const midAngle = item.startAngle + (item.endAngle - item.startAngle) / 2;

      pos[0] = this._radius * 1.1 * (midAngle < this._pi ? 1 : -1);
      pos[0] = this._width / 2 + pos[0];
      pos[1] = this._height / 2 + pos[1];

      if (this.type === 'default' && this.showLabels) {
        const text = this.canvas.append('text')
          .style('text-anchor', midAngle < this._pi ? 'start' : 'end');

        text
        .append('tspan')
        .attr('font-size', '10')
        .attr('x', 0)
        .attr('dy', 13)
        .attr('fill', '#16325C')
        .text(item.data.label);

        text
          .append('tspan')
          .attr('font-size', '10')
          .attr('font-weight', 700)
          .attr('x', 0)
          .attr('dy', 13)
          .attr('fill', '#7B8591')
          .text(`${(percent * 100).toFixed(2)}%`);

        text
          .attr('transform', `translate(${pos[0]}, ${pos[1] - text.node().getBoundingClientRect().height})`);
      }


      function onShowTooltip(event) {
        if (comp.tooltipType === 'default') {
          if (!item.data.tooltipText) { return; }
          d3.select('app-more-options p').text(item.data.tooltipText);
          d3.select('app-more-options').classed('hidden', false);
        } else if (comp.tooltipType === 'collateral-detail') {
          if (!item.data.tooltip) {
            throw Error(`you must provide tooltip for tooltipType of ${'collateral-detail'}`);
          }
          const el = d3.select(comp.self.nativeElement).select('.collateral-detail-tooltip')
          .style('left', event.x - 50 + 'px')
          .style('top', event.y - 50 + 'px')
          .style('opacity', 1);

          el.select('#tooltip1')
          .text(item.data.tooltip[0]);
          el.select('#tooltip2')
          .text(item.data.tooltip[1]);
          el.select('#tooltip3')
          .text(item.data.tooltip[2]);
        }
      }

      function onMoveTooltip(event) {
        if (comp.tooltipType === 'default') {
          if (!item.data.tooltipText) { return; }
          d3.select('app-more-options')
            .style('left', `${event.offsetX - 72}px`)
            .style('top', `${event.offsetY + 25}px`);
        } else if (comp.tooltipType === 'collateral-detail') {
          const el = d3.select(comp.self.nativeElement).select('.collateral-detail-tooltip')
          .style('left', event.offsetX + 25 + 'px')
          .style('top', event.offsetY - 25 + 'px')
          .style('opacity', 1);

        }

      }

      function onCloseTooltip() {
        if (comp.tooltipType === 'default') {
          if (!item.data.tooltipText) { return; }
          d3.select('app-more-options').classed('hidden', true);
        } else if (comp.tooltipType === 'collateral-detail') {
          // Hide the tooltip
          d3.select(comp.self.nativeElement).select('.collateral-detail-tooltip')
          .style('opacity', 0);
        }

      }

      this.canvas
        .append('path')
        .attr('d', arc)
        .attr('fill', item.data.color)
        .attr('stroke', 'white')
        .attr('opacity', this.anyArcsSelected && !item.data.selected ? 0.2 : 1)
        .attr('transform', `translate(${this._width / 2} ${this._height / 2})`)
        .on('click', (event: MouseEvent) => {
          if (!this.clickable) { return; }
          this._onArcSelected(item.data);
          comp.sectionEnter.emit(item.data);
          comp.sectionClick.emit(item.data);
          event.stopPropagation();
        })
        .on('mouseover', (event) => {
          comp.sectionEnter.emit(item.data);
          onShowTooltip(event);
        })
        .on('mouseout', (event) => {
          comp.sectionLeave.emit(item.data);
          onCloseTooltip();
        })
        .on('mousemove', (event: MouseEvent) => {
          onMoveTooltip(event);
        });

      previousAngle = newAngle;
    });

    let centralString;
    let cColor = this.centralColor;
    if (this.type === 'progress') {
      const progressPercent = this._data[0].value / this._total;
      centralString = `${(progressPercent * 100).toFixed(0)}%`;
      cColor = 'black';
    } else if (this.centralLabel !== undefined) {
      centralString = this.centralLabel;
    } else {
      centralString = this._total;
    }
    // set total value
    if (this.showTotal) {
      // set central value
      const centralText = this.canvas
        .append('text')
        .text(centralString)
        .attr('font-size', 29)
        .attr('fill', cColor);

      const centralTextRect = centralText.node().getBoundingClientRect();

      centralText
        .attr('transform', `translate(${this._width / 2}, ${this._height / 2})`)
        .attr('dx', -(centralTextRect.width / 2))
        .attr('dy', centralTextRect.height / 4);
    }

  }

  /**
   * degree to radian
   * @param degree degree
   */
  private _degreeToRadian(degree: number): number {
    return degree * (this._pi / 180);
  }

  /**
   * clear chart
   */
  private _clearChart(): void {
    // this.canvas.selectAll('*').remove();
    d3.select(this.self.nativeElement).select('svg').remove();
    this.svg = null;
  }

  private _onArcSelected(item: DonutChartData): void {
    const oldState = JSON.stringify(this.data);
    this.data.forEach(d => {
      d.selected = d === item ? !d.selected : false;
    });
    const newState = JSON.stringify(this.data);
    if (oldState !== newState) {
      // only emit if something has actually changed
      this._draw();
      this.selectionChange.emit();
    }
  }
}

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {getElement} from '../../utils/element.util';

export interface HalfDonutChartData {
  label: string;
  status: string;
  value: number;
  color: string;
  isLine: boolean;
}

@Component({
  selector: 'app-half-donut-chart',
  templateUrl: './half-donut-chart.component.html',
  styleUrls: ['./half-donut-chart.component.scss']
})
export class HalfDonutChartComponent implements OnInit {
  // data
  @Input() set data(data: HalfDonutChartData[]) {
    this._data = [...data];
    if (this._data && this.canvas) {
      this.total = 0;
      for (const item of this._data) {
        if (!item.isLine) {
          this.total += item.value;
        }
      }

      this._clearChart();
      this._sortData();
      this._createChart();
    }
  }
  total = 300;

  // canvas
  @ViewChild('canvas') canvasRef: ElementRef<SVGElement>;

  // data
  private _data: HalfDonutChartData[] = [];
  // // total value
  // private total = 300;
  // pi value
  private readonly _pi = Math.PI;
  // radius
  private readonly _radius = 109;
  // canvas width
  private readonly _width = 300;
  // canvas height
  private readonly _height = 200;

  private readonly _thickness = 40;

  private readonly _numLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  constructor() { }

  ngOnInit() {
  }

  get canvas(): d3.Selection<SVGElement, null, null, null> {
    const el = getElement(this.canvasRef);

    if (el) {
      return d3.select(el);
    }
  }

  private _sortData(): void {
    this._data = this._data.sort((a, b) => a.value - b.value);
    this._data.push({
      label: '',
      status: '',
      value: this.total,
      isLine: false,
      color: '#f0f2f8'
    });

  }

  /**
   * create chart
   */
  private _createChart(): void {

    let itemIdx = 0;
    // create label
    this._numLabels.forEach(numLabel => {
      const newAngle = this._degreeToRadian(-180 + numLabel / 100 * 180);

      const x1 = (this._radius - 10) * Math.cos(newAngle);
      const y1 = (this._radius - 10) * Math.sin(newAngle);
      const x2 = (this._radius + 7) * Math.cos(newAngle);
      const y2 = (this._radius + 7) * Math.sin(newAngle);
      this.canvas.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .style('stroke', '#f0f2f8')
        .style('stroke-width', '2px')
        .attr('transform', `translate(${this._width / 2} ${this._height * 0.9})`);

      const newRadius = this._radius * 1.2;
      const x3 = this._width / 2 + newRadius * Math.cos(newAngle);
      const y3 = this._height * 0.9 + newRadius * Math.sin(newAngle);


      const text = this.canvas.append('text')
        .style('text-anchor', 'middle');

      const curPercent = this._data[itemIdx].value / this.total * 100;
      if ( curPercent >= numLabel && curPercent < (numLabel + 10) && itemIdx < (this._data.length - 1)) {
        text.append('tspan')
          .attr('x', x3)
          .attr('y', y3)
          .attr('font-size', '16px')
          .attr('fill', this._data[itemIdx].color)
          .attr('font-weight', '700')
          .text(numLabel);

        itemIdx += 1;
      } else {
        text.append('tspan')
          .attr('x', x3)
          .attr('y', y3)
          .attr('font-size', '14px')
          .attr('fill', '#43425d')
          .attr('opacity', '0.5')
          .text(numLabel);
      }

    });

    let previousAngle = -90;
    let lastPercent = 0;

    const pie = d3.pie<any, HalfDonutChartData>().sort(null).value(d => d.value);
    const data = pie(this._data);

    // create arc
    data.forEach(item => {
      if (!item.data.isLine ) {
        const percent = item.value / this.total;
        const newAngle = previousAngle + (180 * (percent - lastPercent));
        lastPercent = percent;


        const arc = d3.arc()
          .innerRadius(this._radius - this._thickness)
          .outerRadius(this._radius)
          .startAngle(this._degreeToRadian(previousAngle))
          .endAngle(this._degreeToRadian(newAngle));

        this.canvas
          .append('path')
          .attr('d', arc)
          .attr('fill', item.data.color)
          .attr('transform', `translate(${this._width / 2} ${this._height * 0.9})`);

        previousAngle = newAngle;
      }

    });

    // create line
    data.forEach(item => {
      if (item.data.isLine ) {
        const newAngle = this._degreeToRadian(-180 + item.data.value / this.total * 180);
        const x1 = (this._radius - this._thickness) * Math.cos(newAngle);
        const y1 = (this._radius - this._thickness) * Math.sin(newAngle);
        const x2 = (this._radius + 7) * Math.cos(newAngle);
        const y2 = (this._radius + 7) * Math.sin(newAngle);

        this.canvas
          .append('line')
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2)
          .style('stroke', item.data.color)
          .style('stroke-width', '2px')
          .attr('transform', `translate(${this._width / 2} ${this._height * 0.9})`);
      }

    });

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
    this.canvas.selectAll('*').remove();
  }
}

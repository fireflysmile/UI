import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {getElement} from '../../../utils/element.util';

@Component({
  selector: 'app-stacked-bar-legend',
  templateUrl: './stacked-bar-legend.component.html',
  styleUrls: ['./stacked-bar-legend.component.scss']
})
export class StackedBarLegendComponent implements OnInit, AfterViewInit {
  // set color
  @Input() set color(color: string) {
    this._color = color;
    this._setLegendColor();
  }
  // color indicator
  @ViewChild('colorIndicator') colorIndicatorRef: ElementRef<HTMLElement>;
  // color
  private _color: string;

  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._setLegendColor();
  }

  /**
   * set legend color
   */
  private _setLegendColor(): void {
    const el = getElement(this.colorIndicatorRef);

    if (el && this._color) {
      this.renderer.setStyle(el, 'background-color', this._color);
    }
  }
}

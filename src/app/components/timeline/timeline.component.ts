import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

export interface TimeLineData {
  date: string;
  time: string;
  label: string;
  // relative size aganist baseSize
  relSize?: number[];
  color?: string;
}

interface InternalTimeLineData {
  date: string;
  time: string;
  label: string;
  // relative size aganist container
  size: number[];
  color: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() set data( input: TimeLineData[]) {
    this.setData(input);
  }

  timeLineData: InternalTimeLineData[] = [];


  // baseLength: 10% = 0.1,  baseWidth: 25% = 0.25
  @Input() baseSize: number[] = [10, 25];

  @Output() barClicked = new EventEmitter();

  defaultColors = ['gray', 'red', 'pink', 'yellow', 'black'];

  constructor() { }

  ngOnInit(): void {
  }

  setData(input: TimeLineData[]) {
    const cloned = _.cloneDeep(input);
    this.timeLineData = [];

    for (let i = 0; i < cloned.length; i++) {
      const section = cloned[i];
      if (!section.color) {
        switch (i) {
          case 0: section.color = this.defaultColors[0]; break;
          case 1: section.color = this.defaultColors[1]; break;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6: section.color = this.defaultColors[2]; break;
          case 7: section.color = this.defaultColors[3]; break;
          case 8: section.color = this.defaultColors[4]; break;
          default: section.color = this.defaultColors[2]; break;
        }
      }
      if (!section.relSize) {
        switch (i) {
          case 0: section.relSize = [1, 1]; break;
          case 1: section.relSize = [1, 1]; break;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6: section.relSize = [1, 1]; break;
          case 7: section.relSize = [1, 1]; break;
          case 8: section.relSize = [1, 1]; break;
          default: section.relSize = [1, 1]; break;
        }
      }

      // @ts-ignore
      this.timeLineData.push({
        ..._.omit(section, 'relSize'),
        size: [section.relSize[0] * this.baseSize[0], section.relSize[1] * this.baseSize[1]]
      });

    }
  }

  onBarClicked(item: InternalTimeLineData) {
    this.barClicked.emit(item);
  }

}

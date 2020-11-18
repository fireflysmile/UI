import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MaturityTimeline } from 'src/app/models/maturity-timeline';
import { TimeLineData } from 'src/app/components/timeline/timeline.component';
import { LengendsCircle } from 'src/app/components/legends-circle/legends-circle.component';
import * as _ from 'lodash';
import { clone } from 'lodash';

// @ts-ignore
const MONTH_CONSTANTS = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'app-maturity-timeline',
  templateUrl: './maturity-timeline.component.html',
  styleUrls: ['./maturity-timeline.component.scss']
})
export class MaturityTimelineComponent implements OnInit {

  @Input() set data( input: MaturityTimeline[]) {
    this.setData(input);
  }
  @Output() barClicked = new EventEmitter();

  timelineData: TimeLineData[] = [];
  defaultColors = ['#8B8A8A', '#E31F26', '#F18E92', '#F1B51C', '#231F20'];

  legends: LengendsCircle[] = [
    {
      label: 'Expired',
      color: this.defaultColors[0],
    },
    {
      label: 'Maturing today',
      color: this.defaultColors[1],
    },
    {
      label: 'Maturing in next 2 weeks',
      color: this.defaultColors[2],
    },
    {
      label: 'Maturing within a month',
      color: this.defaultColors[3],
    },
    {
      label: 'Maturing after a month',
      color: this.defaultColors[4],
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setZero(d: Date) {
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
  }
  isBeforeToday(inp: Date, ref: Date) {
    const cloned = _.cloneDeep(ref);
    this.setZero(cloned);

    // @ts-ignore
    const dif = inp - cloned;
    if (dif < 0) {
      return true;
    }
    return false;
  }

  checkDate(inp: Date, ref: Date) {
    const lower = _.cloneDeep(ref);
    this.setZero(lower);

    const upper = _.cloneDeep(ref);
    upper.setDate(upper.getDate() + 1);
    this.setZero(upper);

    const twoWeekUpper = _.cloneDeep(ref);
    twoWeekUpper.setDate(twoWeekUpper.getDate() + 14);
    this.setZero(twoWeekUpper);

    const fourWeekUpper = _.cloneDeep(ref);
    fourWeekUpper.setDate(fourWeekUpper.getDate() + 28);
    this.setZero(fourWeekUpper);

    if ( inp >= lower && inp < upper) {
      return 'today';
    }

    if (inp < lower) {
      return 'history';
    }

    if (inp >= upper && inp < twoWeekUpper) {
      return 'twoWeeks';
    }

    if (inp >= twoWeekUpper && inp < fourWeekUpper) {
      return 'month';
    }

    if (inp >= fourWeekUpper ) {
      return 'onwards';
    }

  }

  setData(input: MaturityTimeline[]) {
    this.timelineData = [];
    let i = 0;
    for (const item of input) {
      let color;
      const inpDate = new Date(item.expiredAt);
      const cur = new Date();

      const ds = this.checkDate(inpDate, cur);
      let relSize = [1, 1];
      const eDate = new Date(item.expiredAt);
      const mString = MONTH_CONSTANTS[eDate.getMonth()];
      let timeString = mString + ' ' + eDate.getDate();
      switch (ds) {
        case 'today': color = this.defaultColors[1];  break;
        case 'history': color = this.defaultColors[0]; relSize = [1, 0.5]; timeString = 'Expired till date'; break;
        case 'twoWeeks': color = this.defaultColors[2]; break;
        case 'month': color = this.defaultColors[3]; break;
        case 'onwards': color = this.defaultColors[4]; relSize = [1, 0.5]; timeString += ' onwards'; break;
      }


      this.timelineData.push({
        time: timeString,
        label: 'INR' + item.value + ' CR',
        color,
        relSize,
        date: item.expiredAt
      });

      i++;
    }
  }

  onBarClicked(item: TimeLineData) {
    this.barClicked.emit(item);
  }

}

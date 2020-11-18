import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-my-task',
  templateUrl: './total-my-task.component.html',
  styleUrls: ['./total-my-task.component.scss']
})
export class TotalMyTaskComponent implements OnInit {
  // total value
  @Input() total: string | number;

  constructor() { }

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';

export type CmMyTaskCardStatus = 'pending' | 'progress' | 'post-checks';

@Component({
  selector: 'app-my-task-card',
  templateUrl: './my-task-card.component.html',
  styleUrls: ['./my-task-card.component.scss']
})
export class MyTaskCardComponent implements OnInit {
  // label
  @Input() label: string;
  // status
  @Input() status: CmMyTaskCardStatus;

  constructor() { }

  ngOnInit() {
  }

}

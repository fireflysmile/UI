import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-final-approval',
  templateUrl: './final-approval.component.html',
  styleUrls: ['./final-approval.component.scss']
})
export class FinalApprovalComponent implements OnInit {
  // till date
  @Input() date: Date | string;
  // value
  @Input() value: string | number;

  constructor() { }

  ngOnInit() {
  }

}

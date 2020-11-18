import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-allocation-status-item',
  templateUrl: './allocation-status-item.component.html',
  styleUrls: ['./allocation-status-item.component.scss']
})
export class AllocationStatusItemComponent implements OnInit {
  // status
  @Input() status: string;
  // is pending
  @HostBinding('class.cm-pending') get pending(): boolean {
    return this.status === 'Pending';
  }
  // is rejected
  @HostBinding('class.cm-rejected') get rejected(): boolean {
    return this.status === 'Rejected';
  }
  // is confirmed
  @HostBinding('class.cm-confirmed') get confirmed(): boolean {
    return this.status === 'Confirmed';
  }

  constructor() { }

  ngOnInit() {
  }

}

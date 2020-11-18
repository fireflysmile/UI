import {Component, Input, OnInit} from '@angular/core';

export type CmSidebarNavIcon =
  'dashboard'
  | 'list'
  | 'settings'
  | 'refresh'
  | 'add-circle'
  | 'exit'
  | 'task'
  | 'protection'
  | 'guard'
  | 'trade'
  | 'member'
  | 'details'
  | 'suitcase'
  | 'documents'
  | 'people'
  | 'declarations'
  | 'background-check'
  | 'signature'
  | 'stacked-windows'
  | 'save'
  | 'home'
  | 'power'
  | 'users'
  | 'monitor'
  | 'line-chart'
  | 'edit'
  | 'stacked-bar-chart';

@Component({
  selector: 'app-sidebar-nav-item',
  templateUrl: './sidebar-nav-item.component.html',
  styleUrls: ['./sidebar-nav-item.component.scss']
})
export class SidebarNavItemComponent implements OnInit {
  // icon
  @Input() icon: CmSidebarNavIcon;
  // notifications
  @Input() notifications: number;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/components/app.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  // current date
  now: Date = new Date();

  constructor(
    public appService: AppService,
  ) { }

  ngOnInit() {
  }
}

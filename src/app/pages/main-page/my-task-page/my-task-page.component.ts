import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {TaskService} from '../../../services/api/task.service';
import {AppService} from '../../../services/components/app.service';
import {MyTaskSummary} from '../../../models/my-task-summary';

@Component({
  selector: 'app-my-task-page',
  templateUrl: './my-task-page.component.html',
  styleUrls: ['./my-task-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class MyTaskPageComponent implements OnInit {
  // summary of my task
  summary: MyTaskSummary;

  constructor(
    private taskService: TaskService,
    private subscriptionService: SubscriptionService,
    public appService: AppService,
  ) { }

  ngOnInit() {
    this._getMyTaskSummary();
  }

  /**
   * get my task summary form the api
   */
  private _getMyTaskSummary(): void {
    const sub = this.taskService
      .getMyTaskSummary()
      .subscribe({
        next: res => this.summary = res,
      });

    this.subscriptionService.store('_getMyTaskSummary', sub);
  }
}

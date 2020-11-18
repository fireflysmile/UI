import { Injectable } from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {randomDate, randomNumber, randomPick} from '../../utils/random.util';
import {MyTaskSummary} from '../../models/my-task-summary';
import {TaskItem} from '../../models/task-item';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('/task');
  }

  /**
   * get my task count for sidebar notification
   */
  getMyTaskCount(): Observable<number> {
    return this.getFakeResponse(randomNumber(5, 50));
  }

  /**
   * get my task summary
   */
  getMyTaskSummary(): Observable<MyTaskSummary> {
    return this.getFakeResponse<MyTaskSummary>({
      reviewPending: 50,
      inProgress: 150,
      postChecks: 100,
      finalApprovals: 15,
      finalApprovalTillDate: new Date(),
    });
  }

  /**
   * get tasks
   * @param start start date
   * @param end end date
   */
  getTasks(start: Date, end: Date): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.endpoint('/tasks.json'))
      .pipe(map(res => {
        return res.filter(item => {
          const over = start ? new Date(item.applicationReceivedOn).valueOf() >= start.valueOf() : true;
          const under = end ? new Date(item.applicationReceivedOn).valueOf() <= end.valueOf() : true;

          return over && under;
        }).map(item => ({...item, maker: item.maker ? item.maker : 'Not Assigned'}));
      }));
  }

  /**
   * delete applications
   * @param tasks tasks to delete
   */
  assignToTask(tasks: TaskItem[]): Observable<void> {
    return this.getFakeResponse(null)
      .pipe(this.attachDelay(400));
  }
}

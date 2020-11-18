import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockTasks } from 'src/assets/data/task/mock-tasks';
import { AppService } from '../components/app.service';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpClient: HttpClient;
  let appService: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestSharedModule],
    });
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    service = TestBed.inject(TaskService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct my task count', fakeAsync(() => {
    service.getMyTaskCount().subscribe((count) => {
      expect(count).toBeTruthy();
    });
    tick(1000);
  }));

  it('should return correct my task summary', fakeAsync(() => {
    service.getMyTaskSummary().subscribe((data) => {
      expect(data.reviewPending).toBeTruthy();
      expect(data.inProgress).toBeTruthy();
      expect(data.postChecks).toBeTruthy();
      expect(data.finalApprovals).toBeTruthy();
      expect(data.finalApprovalTillDate).toBeTruthy();
    });
    tick(1000);
  }));

  it('should assign to task', fakeAsync(() => {
    service.assignToTask([]).subscribe((data) => {
      expect(data).toEqual(null);
    });
    tick(1000);
  }));

  it('should get tasks', fakeAsync(() => {
    spyOn(httpClient, 'get').and.returnValue(of(mockTasks));
    service.getTasks(null, null).subscribe((datas) => {
      expect(datas.length).toEqual(100);
    });
    tick(1000);

    service
      .getTasks(new Date(2010, 7, 6), new Date(2010, 7, 6))
      .subscribe((datas) => {
        expect(datas.length).toEqual(0);
      });
    tick(1000);
  }));
});

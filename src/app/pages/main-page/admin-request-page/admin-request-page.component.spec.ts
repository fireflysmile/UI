import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRequestTableModule } from 'src/app/components/admin-request-table/admin-request-table.module';
import { StartNewRequestModule } from 'src/app/components/start-new-request/start-new-request.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { By } from '@angular/platform-browser';

import { AdminRequestPageComponent } from './admin-request-page.component';
import { StartNewRequestComponent } from 'src/app/components/start-new-request/start-new-request.component';

describe('AdminRequestPageComponent', () => {
  let component: AdminRequestPageComponent;
  let fixture: ComponentFixture<AdminRequestPageComponent>;
  let startNewRequest: StartNewRequestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRequestPageComponent],
      imports: [
        StartNewRequestModule,
        AdminRequestTableModule,
        TestSharedModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestPageComponent);
    startNewRequest = fixture.debugElement.query(By.directive(StartNewRequestComponent)).componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on start request', () => {
    const spyOnStartRequest = spyOn(component, 'onStartRequest').and.callThrough();
    startNewRequest.startRequest.emit();
    expect(spyOnStartRequest).toHaveBeenCalled();
  });
});

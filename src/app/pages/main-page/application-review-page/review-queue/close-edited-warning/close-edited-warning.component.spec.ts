import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { CloseEditedWarningComponent } from './close-edited-warning.component';

describe('CloseEditedWarningModalComponent', () => {
  let component: CloseEditedWarningComponent;
  let fixture: ComponentFixture<CloseEditedWarningComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloseEditedWarningComponent],
      imports: [TestSharedModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(CloseEditedWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

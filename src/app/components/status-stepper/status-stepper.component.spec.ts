import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { StatusStepperItemModule } from '../status-stepper-item/status-stepper-item.module';

import { StatusStepperComponent } from './status-stepper.component';

describe('StatusStepperComponent', () => {
  let component: StatusStepperComponent;
  let fixture: ComponentFixture<StatusStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusStepperComponent],
      imports: [TestSharedModule, StatusStepperItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

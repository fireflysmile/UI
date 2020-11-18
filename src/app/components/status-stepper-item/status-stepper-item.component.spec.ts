import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { StatusStepperItemComponent } from './status-stepper-item.component';

describe('StatusStepperItemComponent', () => {
  let component: StatusStepperItemComponent;
  let fixture: ComponentFixture<StatusStepperItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusStepperItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusStepperItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

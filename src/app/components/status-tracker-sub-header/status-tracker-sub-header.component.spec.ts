import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardHeaderModule } from '../rect-card/rect-card-header/rect-card-header.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { StatusTrackerSubHeaderComponent } from './status-tracker-sub-header.component';

describe('StatusTrackerSubHeaderComponent', () => {
  let component: StatusTrackerSubHeaderComponent;
  let fixture: ComponentFixture<StatusTrackerSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusTrackerSubHeaderComponent],
      imports: [TestSharedModule, RectCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTrackerSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { LastMonthApplicationsComponent } from './last-month-applications.component';

describe('LastMonthApplicationsComponent', () => {
  let component: LastMonthApplicationsComponent;
  let fixture: ComponentFixture<LastMonthApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastMonthApplicationsComponent],
      imports: [TestSharedModule, RectCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMonthApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    tick(10000);
    component.ngOnDestroy();
  }));
});

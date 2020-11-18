import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { SplitApplicationCardModule } from '../split-application-card/split-application-card.module';

import { SplitApplicationsComponent } from './split-applications.component';

describe('SplitApplicationsComponent', () => {
  let component: SplitApplicationsComponent;
  let fixture: ComponentFixture<SplitApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitApplicationsComponent],
      imports: [TestSharedModule, RectCardModule, SplitApplicationCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitApplicationsComponent);
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

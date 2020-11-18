import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { TotalMyTaskComponent } from './total-my-task.component';

describe('TotalMyTaskComponent', () => {
  let component: TotalMyTaskComponent;
  let fixture: ComponentFixture<TotalMyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TotalMyTaskComponent],
      imports: [TestSharedModule, RectCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalMyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

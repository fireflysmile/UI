import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { MyTaskCardComponent } from './my-task-card.component';

describe('MyTaskCardComponent', () => {
  let component: MyTaskCardComponent;
  let fixture: ComponentFixture<MyTaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyTaskCardComponent],
      imports: [TestSharedModule, RectCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

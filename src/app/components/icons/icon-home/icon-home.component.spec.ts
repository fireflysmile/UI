import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../../rect-card/rect-card.module';
import { TabRouterModule } from '../../tab-router/tab-router.module';

import { IconHomeComponent } from './icon-home.component';

describe('IconHomeComponent', () => {
  let component: IconHomeComponent;
  let fixture: ComponentFixture<IconHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconHomeComponent],
      imports: [TestSharedModule, RectCardModule, TabRouterModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

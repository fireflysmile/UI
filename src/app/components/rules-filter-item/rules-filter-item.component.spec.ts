import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { RulesFilterItemComponent } from './rules-filter-item.component';

describe('RulesFilterItemComponent', () => {
  let component: RulesFilterItemComponent;
  let fixture: ComponentFixture<RulesFilterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RulesFilterItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesFilterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

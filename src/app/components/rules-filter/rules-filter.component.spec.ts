import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../divider/divider.module';
import { RulesFilterItemModule } from '../rules-filter-item/rules-filter-item.module';

import { RulesFilterComponent } from './rules-filter.component';

describe('RulesFilterComponent', () => {
  let component: RulesFilterComponent;
  let fixture: ComponentFixture<RulesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RulesFilterComponent],
      imports: [TestSharedModule, RulesFilterItemModule, DividerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

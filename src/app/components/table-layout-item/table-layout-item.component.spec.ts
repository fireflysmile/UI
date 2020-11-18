import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLayoutItemComponent } from './table-layout-item.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AppService } from 'src/app/services/components/app.service';

describe('TableLayoutItemComponent', () => {
  let component: TableLayoutItemComponent<string>;
  let fixture: ComponentFixture<TableLayoutItemComponent<string>>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableLayoutItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(TableLayoutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

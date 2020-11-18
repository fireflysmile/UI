import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ShorthandedNumberPipeModule } from 'src/app/pipes/shorthanded-number-pipe/shorthanded-number-pipe.module';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { StackedBarComponent } from './stacked-bar.component';

describe('StackedBarComponent', () => {
  let component: StackedBarComponent;
  let fixture: ComponentFixture<StackedBarComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackedBarComponent],
      imports: [ShorthandedNumberPipeModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(StackedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct data', fakeAsync(() => {
    component.data = {
      label: 'June',
      values: null,
    };
    tick();
    component.data = {
      label: 'June',
      values: [
        { key: 'Key Approvals', value: 754 },
        { key: 'Mandatory Submissions', value: 452 },
        { key: 'Other Compliances', value: 572 },
      ],
    };
    tick();
    component.maximum = 3000;
    tick();
    component.colors = null;
    tick();
    component.colors = [
      { key: 'Key Approvals', color: '#16325C' },
      { key: 'Mandatory Submissions', color: '#0070D1' },
      { key: 'Other Compliances', color: '#0A7E78' },
    ];
    tick();
    fixture.detectChanges();
    expect(component.total).toEqual(1778);
    component.maximum = null;
    tick();
    expect(component.total).toEqual(1778);
    expect(component.anyBarSelected).toEqual(false);

  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { FinalApprovalComponent } from './final-approval.component';

describe('FinalApprovalComponent', () => {
  let component: FinalApprovalComponent;
  let fixture: ComponentFixture<FinalApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinalApprovalComponent],
      imports: [TestSharedModule, RectCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

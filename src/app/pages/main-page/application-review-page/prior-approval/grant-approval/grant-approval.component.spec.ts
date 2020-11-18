import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { CardActionItemModule } from 'src/app/components/card-action-item/card-action-item.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';

import { GrantApprovalComponent } from './grant-approval.component';

describe('GrantApprovalComponent', () => {
  let component: GrantApprovalComponent;
  let fixture: ComponentFixture<GrantApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrantApprovalComponent],
      imports: [CardActionItemModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantApprovalComponent);
    component = fixture.componentInstance;
    component.application = _.cloneDeep(mockApplicationReview);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected directors', () => {
    component.directors = [
      {
        id: '1',
        name: 'name',
        selected: true,
      },
    ];
    expect(component.selectedDirectorsCount).toEqual(1);
  });
});

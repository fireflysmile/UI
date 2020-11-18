import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LookupService } from 'src/app/services/api/lookup.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { PageActionsModule } from '../page-actions/page-actions.module';
import { RectCardModule } from '../rect-card/rect-card.module';
import { SelectModule } from '../select/select.module';

import { StartNewRequestComponent } from './start-new-request.component';

describe('StartNewRequestComponent', () => {
  let component: StartNewRequestComponent;
  let fixture: ComponentFixture<StartNewRequestComponent>;
  let lookupService: LookupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartNewRequestComponent],
      imports: [
        RectCardModule,
        TestSharedModule,
        SelectModule,
        FormFieldModule,
        PageActionsModule,
      ],
      providers: [SubscriptionService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNewRequestComponent);
    lookupService = TestBed.inject(LookupService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct form value', () => {
    const spyOnGetMembers = spyOn(lookupService, 'getMembers').and.returnValue(
      of(null)
    );
    const spyOnGetmemberTypes = spyOn(
      lookupService,
      'getMemberTypes'
    ).and.returnValue(of(null));
    component.ngOnInit();
    component.group.patchValue({
      memberName: 'newmemberName',
      memberCode: 'newmemberCode',
      memberType: 'newmemberType',
    });
    expect(component.memberName.value).toEqual('');
    expect(component.memberCode.value).toEqual('newmemberCode');
    expect(component.memberType.value).toEqual('newmemberType');

    spyOnGetMembers.and.returnValue(
      of([
        {
          name: 'newmemberName',
          code: 'newmemberCode',
          type: 'newmemberType',
        },
      ])
    );
    spyOnGetmemberTypes.and.returnValue(of(['newmemberType']));
    component.ngOnInit();
    component.group.patchValue({
      memberName: 'newmemberName',
      memberCode: 'newmemberCode',
      memberType: 'newmemberType',
    });
    expect(component.memberName.value).toEqual('newmemberName');
    expect(component.memberCode.value).toEqual('newmemberCode');
    expect(component.memberType.value).toEqual('newmemberType');
  });
});

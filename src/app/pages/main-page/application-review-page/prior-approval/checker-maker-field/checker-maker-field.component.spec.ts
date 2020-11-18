import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SelectModule } from 'src/app/components/select/select.module';
import { LookupService } from 'src/app/services/api/lookup.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { CheckerMakerFieldComponent } from './checker-maker-field.component';

describe('CheckerMakerFieldComponent', () => {
  let component: CheckerMakerFieldComponent;
  let fixture: ComponentFixture<CheckerMakerFieldComponent>;
  let lookupService: LookupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckerMakerFieldComponent],
      imports: [TestSharedModule, SelectModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerMakerFieldComponent);
    lookupService = TestBed.inject(LookupService);
    component = fixture.componentInstance;
    component.official = {
      id: 'id',
      name: 'name',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select offical', () => {
    component.editable = true;
    component.ngOnInit();
    const spyOnGetEmployees = spyOn(
      lookupService,
      'getROEmployees'
    ).and.returnValue(
      of([
        {
          id: '1',
          name: 'name',
        },
      ])
    );
    component.official = null;
    component.ngOnInit();
    expect(component.selectedOfficial).toEqual(undefined);
    component.official = {
      id: '1',
      name: 'name',
    };
    component.ngOnInit();
    expect(component.selectedOfficial.id).toEqual('1');
  });

  it('should emit event when select official', () => {
    const spyOnSelect = spyOn(component.select, 'emit');
    component.onSelectOfficial({
      id: '1',
      name: 'name',
    });
    expect(spyOnSelect).toHaveBeenCalled();
  });
});

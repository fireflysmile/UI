import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApplicationTableModule } from 'src/app/components/application-table/application-table.module';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';
import { SearchApplicationFilterModule } from 'src/app/components/search-application-filter/search-application-filter.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { SearchApplicationPageComponent } from './search-application-page.component';

describe('SearchApplicationPageComponent', () => {
  let component: SearchApplicationPageComponent;
  let fixture: ComponentFixture<SearchApplicationPageComponent>;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchApplicationPageComponent],
      imports: [
        BackButtonModule,
        ApplicationTableModule,
        SearchApplicationFilterModule,
        TestSharedModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchApplicationPageComponent);
    component = fixture.componentInstance;
    applicationService = TestBed.inject(ApplicationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search applications', () => {
    spyOn(applicationService, 'searchApplications').and.returnValue(of([]));
    component.searchApplications({
      year: {
        year: 0,
        month: 0,
        start: 0,
        end: 0,
      },
      memberCode: '',
      memberName: '',
      requestType: '',
      applicationId: '',
    });
    expect(component.applications).toEqual([]);
  });
});

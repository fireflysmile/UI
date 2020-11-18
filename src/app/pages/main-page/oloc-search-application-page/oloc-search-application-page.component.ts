import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/api/application.service';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { SearchApplicationFilter } from '../../../models/search-application-filter';
import { ApplicationItem } from '../../../models/application-item';
import { finalize } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { LookupService } from '../../../services/api/lookup.service';
import { DatePipe } from '@angular/common';
import { ActionItem } from 'src/app/models/action-item';
import {
  addYearToDate,
  getEndOfDate,
  getStartOfDate,
} from 'src/app/utils/date.util';

@Component({
  selector: 'app-oloc-search-application-page',
  templateUrl: './oloc-search-application-page.component.html',
  styleUrls: ['./oloc-search-application-page.component.scss'],
  providers: [SubscriptionService],
})
export class OlocSearchApplicationPageComponent implements OnInit {
  // applications
  applications: ApplicationItem[] = [];
  // application data loaded state
  // the table content will be rendered after first data loaded
  loaded = false;

  private _datePipe: DatePipe = new DatePipe('en-US');

  // form group
  group: FormGroup = new FormGroup({
    memberName: new FormControl(''),
    memberCode: new FormControl(''),
    requestType: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });
  // member names
  memberNames: string[] = [];
  // member codes
  memberCodes: string[] = [];
  // request types
  requestTypes: string[] = [];
  // application ids
  applicationIds: string[] = [];

  actionTo: ActionItem[][] = [
    [
      {
        icon: 'calendar-range',
        label: null,
        opened: false,
        action() {
          this.opened = !this.opened;
        },
        moreOptionsConfig: {
          type: 'date',
          label: 'To Date',
          date: null,
          minDate: null,
          maxDate: null,
          onApply: (date: Date) =>
            this._onDateRangeApplied(
              this.actionFrom[0][0].moreOptionsConfig.date,
              date
            ),
        },
      },
    ],
  ];

  actionFrom: ActionItem[][] = [
    [
      {
        icon: 'calendar-range',
        label: '',
        opened: false,
        action() {
          this.opened = !this.opened;
        },
        moreOptionsConfig: {
          type: 'date',
          label: 'From Date',
          date: null,
          onApply: (date: Date) =>
            this._onDateRangeApplied(
              date,
              this.actionTo[0][0].moreOptionsConfig.date
            ),
        },
      },
    ],
  ];

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private lookupService: LookupService
  ) {}

  ngOnInit() {
    this._getLookups();
  }

  /**
   * search applications
   * @param filters filters
   */
  searchApplications(filters: SearchApplicationFilter): void {
    const sub = this.applicationService
      .searchApplications({
        year: {
          year: 2020,
          month: null,
          start: null,
          end: null,
        },
        memberCode: null,
        memberName: null,
        requestType: null,
        applicationId: null,
      })
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe({
        next: (res) => (this.applications = res),
      });

    this.subscriptionService.store('searchApplications', sub);
  }

  get year(): FormControl | AbstractControl {
    return this.group.get('year');
  }

  get memberName(): FormControl | AbstractControl {
    return this.group.get('memberName');
  }

  get memberCode(): FormControl | AbstractControl {
    return this.group.get('memberCode');
  }

  get requestType(): FormControl | AbstractControl {
    return this.group.get('requestType');
  }

  /**
   * get lookups for application filter
   */
  private _getLookups(): void {
    const sub = combineLatest([
      this.lookupService.getMembers(),
      this.lookupService.getRequestTypes(),
      this.lookupService.getAvailableApplicationIds(),
    ]).subscribe((res) => {
      this.memberNames = (res[0] || []).map((item) => item.name);
      this.memberCodes = (res[0] || []).map((item) => item.code);
      this.requestTypes = res[1] || [];
      this.applicationIds = res[2] || [];
    });

    this.subscriptionService.store('_getLookups', sub);
  }

  /**
   * check date range changed and call _getTasks
   * @param start start date
   * @param end end date
   */
  private _onDateRangeApplied(start: Date, end: Date): void {
    const dateFormat = 'dd MMMM yyyy';
    this.group.controls.startDate.setValue(
      start ? this._datePipe.transform(start, dateFormat) : null
    );
    this.group.controls.endDate.setValue(
      end ? this._datePipe.transform(end, dateFormat) : null
    );

    const startDate = getStartOfDate(start);
    this.actionFrom[0][0].moreOptionsConfig.date = startDate;
    const endDate = getEndOfDate(end);
    this.actionTo[0][0].moreOptionsConfig.date = endDate;
    if (startDate) {
      this.actionTo[0][0].moreOptionsConfig.minDate = startDate;
      this.actionTo[0][0].moreOptionsConfig.maxDate = addYearToDate(
        startDate,
        1
      );
    }
  }
}

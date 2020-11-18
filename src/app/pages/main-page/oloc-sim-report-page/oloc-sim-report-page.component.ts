import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/api/application.service';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { SearchApplicationFilter } from '../../../models/search-application-filter';
import { ApplicationItem } from '../../../models/application-item';
import { finalize } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LookupService } from '../../../services/api/lookup.service';
import { MessageService } from 'src/app/components/message/message.service';

@Component({
  selector: 'app-oloc-sim-report-page',
  templateUrl: './oloc-sim-report-page.component.html',
  styleUrls: ['./oloc-sim-report-page.component.scss'],
  providers: [SubscriptionService],
})
export class OlocSimReportPageComponent implements OnInit {
  // applications
  applications: ApplicationItem[] = [];
  // application data loaded state
  // the table content will be rendered after first data loaded
  loaded = false;

  // form group
  group: FormGroup = new FormGroup({
    year: new FormControl(
      {
        quarter: null,
        start: null,
        end: null,
      },
      (control: FormControl | AbstractControl) => {
        const value = control.value;
        if (
          value.quarter === null &&
          (value.start === null || value.end === null)
        ) {
          return {
            required: {
              value: control.value,
            },
          };
        }
      }
    ),
    requestType: new FormControl('', Validators.required),
  });
  // request types
  requestTypes: string[] = [];

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private lookupService: LookupService,
    private messageService: MessageService
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
      .searchApplications(filters)
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe({
        next: (res) => (this.applications = res),
      });

    this.subscriptionService.store('searchApplications', sub);
  }

  /**
   * Show invalid generate message
   */
  showInvalidGenerateMessage(): void {
    this.messageService.open(
      'warn',
      'Please select all mandatory fields before generating report'
    );
  }

  get requestType(): FormControl | AbstractControl {
    return this.group.get('requestType');
  }

  /**
   * get lookups for application filter
   */
  private _getLookups(): void {
    const sub = combineLatest([
      this.lookupService.getApplicationRequestTypes(),
    ]).subscribe((res) => {
      this.requestTypes = res[0] || [];
      this.requestTypes.unshift('All');
    });

    this.subscriptionService.store('_getLookups', sub);
  }
}

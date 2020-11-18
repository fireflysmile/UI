import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {YearValue} from '../year-selector/year-selector.component';
import {LookupService} from '../../services/api/lookup.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {combineLatest} from 'rxjs';
import {SearchApplicationFilter} from '../../models/search-application-filter';

@Component({
  selector: 'app-search-application-filter',
  templateUrl: './search-application-filter.component.html',
  styleUrls: ['./search-application-filter.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SearchApplicationFilterComponent implements OnInit {
  // search
  @Output() search: EventEmitter<SearchApplicationFilter> = new EventEmitter();
  // form group
  group: FormGroup = new FormGroup({
    year: new FormControl({
      year: null,
      month: null,
      start: null,
      end: null,
    } as YearValue, control => {
      if (this.group && !this.group.get('applicationId').value && control && control.value && !control.value.year) {
        return {
          required: {
            value: control.value,
          },
        };
      }
    }),
    memberName: new FormControl(''),
    memberCode: new FormControl(''),
    requestType: new FormControl(''),
    applicationId: new FormControl(''),
  });
  // member names
  memberNames: string[] = [];
  // member codes
  memberCodes: string[] = [];
  // request types
  requestTypes: string[] = [];
  // application ids
  applicationIds: string[] = [];

  constructor(
    private lookupService: LookupService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getLookups();
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
    ]).subscribe(res => {
      this.memberNames = (res[0] || []).map(item => item.name);
      this.memberCodes = (res[0] || []).map(item => item.code);
      this.requestTypes = res[1] || [];
      this.applicationIds = res[2] || [];
    });

    this.subscriptionService.store('_getLookups', sub);
  }

  /**
   * set other fields to be disabled
   * @param id application id
   */
  onApplicationIdChange(id: string): void {
    if (id) {
      this.year.patchValue({
        year: null,
        month: null,
        start: null,
        end: null,
      });
      this.memberCode.patchValue('');
      this.memberName.patchValue('');
      this.requestType.patchValue('');

      this.year.disable();
      this.memberCode.disable();
      this.memberName.disable();
      this.requestType.disable();
    } else {
      this.year.enable();
      this.memberCode.enable();
      this.memberName.enable();
      this.requestType.enable();
    }
  }
}

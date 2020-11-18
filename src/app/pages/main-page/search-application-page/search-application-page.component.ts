import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../../services/api/application.service';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {SearchApplicationFilter} from '../../../models/search-application-filter';
import {ApplicationItem} from '../../../models/application-item';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-search-application-page',
  templateUrl: './search-application-page.component.html',
  styleUrls: ['./search-application-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class SearchApplicationPageComponent implements OnInit {
  // applications
  applications: ApplicationItem[] = [];
  // application data loaded state
  // the table content will be rendered after first data loaded
  loaded = false;

  constructor(
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
  }

  /**
   * search applications
   * @param filters filters
   */
  searchApplications(filters: SearchApplicationFilter): void {
    const sub = this.applicationService
      .searchApplications(filters)
      .pipe(finalize(() => this.loaded = true))
      .subscribe({
        next: res => this.applications = res,
      });

    this.subscriptionService.store('searchApplications', sub);
  }
}

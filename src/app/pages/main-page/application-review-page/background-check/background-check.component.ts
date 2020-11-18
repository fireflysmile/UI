import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationReviewSectionBaseComponent } from '../application-review-section-base/application-review-section-base.component';

@Component({
  selector: 'app-background-check',
  templateUrl: './background-check.component.html',
  styleUrls: [
    '../application-review-section-base/application-review-section-base.component.scss',
    './background-check.component.scss'
  ]
})
export class BackgroundCheckComponent extends ApplicationReviewSectionBaseComponent implements OnInit {

  public stats: {
    value: number;
    title: string;
    subtitle?: string;
  }[];

  public config = environment.backgroundCheckRiskConfig;

  public columns = [
    { label: 'Director Name', property: 'name' },
    { label: 'Website', property: 'website' },
    { label: 'Feature', property: 'feature' },
    { label: 'Risk', property: 'risk', displayType: 'risk' },
    { label: 'Other Comments', property: 'otherComments' }
  ];

  ngOnInit() {
    this._setupData();
  }

  /**
   * set up stats data
   */
  private _setupData() {
    this.stats = [];
    this.stats.push({ value: this.application.backgroundChecks.length, title: 'Entries' });
    ['high', 'medium', 'low'].forEach(type => {
      this.stats.push({
        value: this.application.backgroundChecks.filter(entry => entry.risk === type).length,
        title: type,
        subtitle: 'Risk Entries'
      });
    });
  }

}

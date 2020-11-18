import { Component, OnInit, Input } from '@angular/core';

import { ApplicationDetails } from 'src/app/models/application-details';
import { ExtensionRequest } from 'src/app/models/extension-request';
import { ApplicationPersonnel } from 'src/app/models/application-personnel';
import { ApplicationService } from 'src/app/services/api/application.service';

@Component({
  selector: 'app-extension-table',
  templateUrl: './extension-table.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './extension-table.component.scss'
  ]
})
export class ExtensionTableComponent implements OnInit {

  @Input() application: ApplicationDetails;
  @Input() viewType: 'checker' | 'maker';
  public request: ExtensionRequest;
  public personnel: ApplicationPersonnel[];
  public disabled: boolean;

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.request = this.application.postImplementation.extensionRequest;
    this.personnel = [...this.application.applicants, ...this.application.postFactos]
      .filter(person => this.request.personnel.find(p => p.id === person.id));

    this.disabled = this.viewType === 'checker' || this.application.postImplementation.memberConfirmation;
  }

  public accept() {
    this.applicationService.respondToExtensionRequest(true).subscribe(() => {
      this.request.accepted = true;
    });
  }

  public reject() {
    this.applicationService.respondToExtensionRequest(false).subscribe(() => {
      this.request.accepted = false;
      this.personnel.forEach(person => person.extensionDate = null);
    });
  }

}

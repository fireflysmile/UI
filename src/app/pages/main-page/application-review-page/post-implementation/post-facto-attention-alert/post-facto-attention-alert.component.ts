import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApplicationService } from 'src/app/services/api/application.service';

@Component({
  selector: 'app-post-facto-attention-alert',
  templateUrl: './post-facto-attention-alert.component.html',
  styleUrls: [
    '../../application-review-section-base/application-review-section-base.component.scss',
    './post-facto-attention-alert.component.scss'
  ]
})
export class PostFactoAttentionAlertComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  public postFactoChanges: { director: string; change: string; }[];

  constructor(private applicationService: ApplicationService) {
    this.applicationService.getChangedPostFacto().subscribe(changes => {
      this.postFactoChanges = changes;
    });
  }

  ngOnInit() {
  }


}

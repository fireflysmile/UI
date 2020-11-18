import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

enum RequestTypes {
  AI_ML_SUBMISSION = 'AI & ML Submission'
}

@Component({
  selector: 'app-ai-ml-submission-page',
  templateUrl: './ai-ml-submission-page.component.html',
  styleUrls: ['./ai-ml-submission-page.component.scss']
})
export class AIMLSubmissionPageComponent implements OnInit {
  form: FormGroup;
  reqTypes = Object.values(RequestTypes);
  visibleModal$ = new BehaviorSubject<'NonEligible' | 'SubmissionClosed'>(null);

  constructor(fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      reqType: RequestTypes.AI_ML_SUBMISSION
    });
  }

  ngOnInit() {
  }

  startApplication = () => {
    // TODO
    this.visibleModal$.next(null);
    this.router.navigate(['../member-details'], { relativeTo: this.route });
  }

}

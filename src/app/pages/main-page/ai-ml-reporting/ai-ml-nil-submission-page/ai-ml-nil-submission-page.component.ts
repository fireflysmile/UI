import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ConfirmModalComponent, ConfirmModalData } from 'src/app/components/confirm-modal/confirm-modal.component';
import { ModalService } from 'src/app/components/modal/modal.service';
import { StatusStepItem } from 'src/app/components/status-stepper-item/status-stepper-item.component';

@Component({
  selector: 'app-ai-ml-nil-submission-page',
  templateUrl: './ai-ml-nil-submission-page.component.html',
  styleUrls: ['./ai-ml-nil-submission-page.component.scss']
})
export class AiMlNilSubmissionPageComponent {
  form: FormGroup;
  visibleModal$ = new BehaviorSubject<'Success'>(null);
  steps: StatusStepItem[] = [
    {
      icon: 'people',
      label: 'Member Details',
      disabled: false,
      clickable: true,
      completed: true,
    },
    {
      icon: 'approval',
      label: 'NIL Submission',
      disabled: false,
      clickable: false,
      completed: false,
    }
  ];

  constructor(fb: FormBuilder, private router: Router, private route: ActivatedRoute, private modalService: ModalService) {
    this.form = fb.group({
      declaration: [null, Validators.compose([Validators.required, this.declarationAcceptedValidator])]
    });
  }

  private declarationAcceptedValidator = (ctrl: FormControl) =>
    ctrl.value === true ? null : { declaration: 'Declaration not accepted' }

  onStepClick = (step: StatusStepItem) => {
    if (step.label === 'Member Details') {
      this.router.navigate(['../member-details'], { relativeTo: this.route });
    }
  }

  submit = () => {
    if (this.form.valid) {
      this.modalService.open(ConfirmModalComponent, {
        data: {
          title: 'Confirmation',
          content: 'Do you really want to do a NIL Submission for\nQuarter <b>Q1: Apr 2020 - Jun 2020</b>?'
        } as ConfirmModalData,
        onClose: res => {
          if (res) {
            this.visibleModal$.next('Success');
          }
        }
      });
    }
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';
import {LookupService} from '../../services/api/lookup.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {finalize} from 'rxjs/operators';
import {TaskItem} from '../../models/task-item';
import {TaskService} from '../../services/api/task.service';
import {MessageService} from '../message/message.service';
import {AppService} from '../../services/components/app.service';

export interface AssignModalData {
  tasks: TaskItem[];
}

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AssignModalComponent implements OnInit {
  // form group
  group: FormGroup = new FormGroup({
    official: new FormControl('', control => {
      if (this.isHO && control && !control.value) {
        return {
          required: {
            value: control.value,
          },
        };
      }
    }),
    maker: new FormControl('', Validators.required),
  });
  // options
  makers: string[] = [];
  // officials
  officials: string[] = [];
  // loading state
  loading = false;
  // is HO
  isHO = false;

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<AssignModalComponent>,
    @Inject(TS_MODAL_DATA) private data: AssignModalData,
    public appService: AppService,
    private taskService: TaskService,
    private lookupService: LookupService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this._getIsHo();
    this._getAvailableAssignees();
    this._getAvailableOfficials();
  }

  /**
   * get is HO
   */
  private _getIsHo(): void {
    const sub = this.appService
      .isHO$
      .subscribe(res => this.isHO = res);

    this.subscriptionService.store('_getIsHo', sub);
  }

  /**
   * get available assignees
   */
  private _getAvailableAssignees(): void {
    const sub = this.lookupService
      .getAvailableAssignees()
      .subscribe({
        next: res => this.makers = res,
      });

    this.subscriptionService.store('_getAvailableAssignees', sub);
  }

  /**
   * get available officials
   */
  private _getAvailableOfficials(): void {
    const sub = this.lookupService
      .getAvailableOfficials()
      .subscribe({
        next: res => this.officials = res,
      });

    this.subscriptionService.store('_getAvailableOfficials', sub);
  }

  /**
   * assign selected member to application
   */
  assignToApplication(): void {
    const value = this.group.getRawValue();

    this.loading = true;

    const sub = this.taskService
      .assignToTask(this.data.tasks)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.open('success', 'Successfully assigned');
          this.tsModalRef.close(value);
        },
      });

    this.subscriptionService.store('assignToApplication', sub);
  }
}

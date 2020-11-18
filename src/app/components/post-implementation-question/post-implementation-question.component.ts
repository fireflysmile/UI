import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../message/message.service';
import {ModalService} from '../modal/modal.service';
import { ApplicationService } from 'src/app/services/api/application.service';
import {
  PostImplementationCheckModalComponent,
  PostImplementationCheckModalData
} from '../post-implementation-check-modal/post-implementation-check-modal.component';
import {PostImplementationDetail} from '../../models/post-implementation-detail';
import {cloneDeep} from 'lodash-es';

@Component({
  selector: 'app-post-implementation-question',
  templateUrl: './post-implementation-question.component.html',
  styleUrls: ['./post-implementation-question.component.scss']
})
export class PostImplementationQuestionComponent implements OnInit {
  // detail
  @Input() detail: PostImplementationDetail;

  constructor(
    private modalService: ModalService,
    private messageService: MessageService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
  }

  /**
   * handle click no
   */
  onClickNo(): void {
    // tslint:disable-next-line:max-line-length
    this.messageService.open('error', `Please implement the change before the approved\ndeadline of the exchange (within 6 months or the extension granted)`);
  }

  /**
   * open director selection modal
   */
  openDirectorSelectionModal(): void {
    this.modalService.open(PostImplementationCheckModalComponent, {
      data: {
        selectedDirectors: this.detail.selectedPostImplementationDirectors,
        notIncomingResigningDirectors: cloneDeep(this.detail.notIncomingResigningDirectors),
      } as PostImplementationCheckModalData,
      onClose: res => {
        if (res) {
          this.applicationService
            .confirmMemberPostImplementation(res.notIncomingResigningDirectors)
            .subscribe(() => {
              this.detail.selectedPostImplementationDirectors = res.directors;
              this.detail.notIncomingResigningDirectors = res.notIncomingResigningDirectors;
              this.detail.verified = true;
            });
        }
      }
    });
  }
}

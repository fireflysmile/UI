import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {checkFileTotalSize} from '../../utils/file.util';
import {MessageService} from '../message/message.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {AttachmentItem} from '../../models/attachment-item';

const {
  requestExtensionUploaderConfig,
} = environment;

@Component({
  selector: 'app-file-upload-card',
  templateUrl: './file-upload-card.component.html',
  styleUrls: ['./file-upload-card.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class FileUploadCardComponent implements OnInit {
  // label
  @Input() label: string;
  // view disabled state
  @Input() viewDisabled = false;
  // upload disabled state
  @Input() uploadDisabled = false;
  // uploaded file
  @Input() uploaded: AttachmentItem;
  // action
  @Input() action: 'download' | 'upload';
  // file uploaded
  @Output() fileUploaded: EventEmitter<File> = new EventEmitter<File>();
  // acceptable files
  accepts: string[] = requestExtensionUploaderConfig.accepts;
  // file limit
  limits: number = requestExtensionUploaderConfig.limits;
  // show modal status
  showUploadedView = false;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  checkFileTotalSize(files: FileList | File[], limit: number): boolean {
    return checkFileTotalSize(files, limit);
  }

  /**
   * handle file upload event
   * @param event event
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files[0];

    if (file) {
      if (this.checkFileTotalSize(input.files, this.limits)) {
        this.fileUploaded.emit(file);
      } else {
        this.messageService.open('error', 'Maximum file size is 2mb');
      }
    }

    input.value = null;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { exportFileFrom2DArray } from 'src/app/utils/other.utils';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-export-files',
  templateUrl: './export-files.component.html',
  styleUrls: ['./export-files.component.scss'],
})
export class ExportFilesComponent implements OnInit {
  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  types = ['.doc', '.csv', '.txt', '.pdf', '.xls', '.odt'];

  group: FormGroup = new FormGroup({
    select: new FormControl('', Validators.required),
  });

  filename = '';

  private readonly filenamePlaceholder = 'document';

  constructor() {}

  ngOnInit(): void {}

  /**
   * download file for specified file type
   */
  download(): void {
    let type = this.group.value.select || this.types[0];
    type = type.slice(1);
    let filename = this.filename || this.filenamePlaceholder;
    filename += `.${type}`;
    exportFileFrom2DArray(this.data, {type, filename});

    this.close.emit();
  }
}

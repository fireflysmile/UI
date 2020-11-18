import { Component, OnInit, Input } from '@angular/core';

export interface ApplicationReviewTableColumn {
  label: string;
  property: string;
  displayType?: string;
  editable?: boolean;
  minProperty?: string;
  maxProperty?: string;
  pattern?: string;
  maxLength?: number;
  options?: {
    label: string;
    value: string;
  };
  valueAccessor?: any;
}

@Component({
  selector: 'app-application-review-table-cell',
  templateUrl: './application-review-table-cell.component.html',
  styleUrls: ['./application-review-table-cell.component.scss'],
})
export class ApplicationReviewTableCellComponent implements OnInit {
  @Input() data: any;
  @Input() column: ApplicationReviewTableColumn;
  @Input() isEditing: boolean;

  public showOptions: boolean;
  public nonEmptyOriginally: boolean;

  constructor() {}

  ngOnInit() {
    if (this.column) {
      this.nonEmptyOriginally = this.data[this.column.property];
    }
  }

  public validateMinMaxAndUpdate(value: any) {
    if (this.column && this.column.displayType === 'month') {
      if (this.column.minProperty) {
        if (new Date(value) >= new Date(this.data[this.column.minProperty])) {
          this.data[this.column.property] = value;
        } else {
          this.data[this.column.property] = this.data[this.column.minProperty];
        }
      }
      if (this.column.maxProperty) {
        if (new Date(value) <= new Date(this.data[this.column.maxProperty])) {
          this.data[this.column.property] = value;
        } else {
          this.data[this.column.property] = this.data[this.column.maxProperty];
        }
      }
    }
  }
}

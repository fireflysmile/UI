import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OfficialInfoItem } from 'src/app/models/official-info-item';
import { LookupService } from 'src/app/services/api/lookup.service';

@Component({
  selector: 'app-checker-maker-field',
  templateUrl: './checker-maker-field.component.html',
  styleUrls: ['./checker-maker-field.component.scss']
})
export class CheckerMakerFieldComponent implements OnInit {

  @Input() label: string;
  @Input() editable: boolean;
  @Input() official: OfficialInfoItem;
  @Output() select = new EventEmitter<OfficialInfoItem>();

  public allOfficials: OfficialInfoItem[];
  public selectedOfficial: OfficialInfoItem;

  constructor(private lookupService: LookupService) { }

  ngOnInit() {
    if (this.editable) {
      this.lookupService.getROEmployees().subscribe(employees => {
        this.allOfficials = employees;
        if (this.official) {
          this.selectedOfficial = employees.find(o => o.id === this.official.id);
        }
      });
    }
  }

  public onSelectOfficial(official: OfficialInfoItem) {
    this.select.emit(official);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonHash } from 'src/app/models/common-hash';
import { instrumentTypeConstants } from 'src/app/utils/constants';

@Component({
  selector: 'app-footer-instrument-type-reference',
  templateUrl: './footer-instrument-type-reference.component.html',
  styleUrls: ['./footer-instrument-type-reference.component.scss']
})
export class FooterInstrumentTypeReferenceComponent implements OnInit {

  instrumentTypes: CommonHash<any[]> = {};

  constructor() {
    this.instrumentTypes = {
      'Cash': [],
      'Non-Cash': []
    };
    for (const key of Object.keys(instrumentTypeConstants)) {
      this.instrumentTypes[instrumentTypeConstants[key].category].push({
        ...instrumentTypeConstants[key],
        name: key
      });
    }
  }

  ngOnInit(): void {
  }

}

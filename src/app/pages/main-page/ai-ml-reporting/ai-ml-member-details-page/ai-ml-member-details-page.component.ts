import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ai-ml-member-details-page',
  templateUrl: './ai-ml-member-details-page.component.html',
  styleUrls: ['./ai-ml-member-details-page.component.scss']
})
export class AiMlMemberDetailsPageComponent implements OnInit {
  form: FormGroup;

  quarterOptions = ['Q1: Jan 2019-Jun 2019', 'Q2: Jul 2019-Sep 2019'];
  entityCategoryOptions = ['Gnidart Member', 'Another option'];

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      quarter: [null, Validators.required],
      entityRegNumber: ['INZ00000122434', Validators.required],
      entityCategory: [this.entityCategoryOptions[0], Validators.required],
      entityName: ['ABC Securities Ltd.', Validators.required],
      entityNo: ['ARR1324ERT45', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}

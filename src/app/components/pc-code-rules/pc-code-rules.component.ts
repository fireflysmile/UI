import {Component, Input, OnInit} from '@angular/core';
import {PcCodeRule} from '../../models/pc-code-rule';

@Component({
  selector: 'app-pc-code-rules',
  templateUrl: './pc-code-rules.component.html',
  styleUrls: ['./pc-code-rules.component.scss']
})
export class PcCodeRulesComponent implements OnInit {
  // rules
  @Input() data: PcCodeRule[] = [];
  // margin value changed state
  // set true when at least one margin value changed
  marginChanged = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * get selected rules
   */
  get selectedRules(): PcCodeRule[] {
    return this.data.filter(item => item.checked);
  }


}

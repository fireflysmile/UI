import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PcCodeRuleDetail} from '../../models/pc-code-rule-detail';

@Component({
  selector: 'app-pc-code-rule-detail',
  templateUrl: './pc-code-rule-detail.component.html',
  styleUrls: ['./pc-code-rule-detail.component.scss']
})
export class PcCodeRuleDetailComponent implements OnInit {
  // index
  @Input() index: number;
  // detail data
  @Input() data: PcCodeRuleDetail;
  // emit when delete icon clicked
  @Output() deleteRule: EventEmitter<void> = new EventEmitter();
  // editing state
  editing = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * add member trading
   */
  addMemberTrading(): void {
    this.data.membersTradingPermitted.push({value: ''});
  }

  /**
   * add prohibited security
   */
  addProhibitedSecurity(): void {
    this.data.prohibitedSecurities.push({value: ''});
  }

  /**
   * remove member trading
   * @param data data to remove
   */
  removeMemberTrading(data: {value: string}): void {
    this.data.membersTradingPermitted = this.data.membersTradingPermitted.filter(item => item !== data);
  }

  /**
   * remove prohibited security
   * @param data data to remove
   */
  removeProhibitedSecurity(data: { value: string }): void {
    this.data.prohibitedSecurities = this.data.prohibitedSecurities.filter(item => item !== data);
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {RuleService} from '../../../../services/api/rule.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {PcCodeRule} from '../../../../models/pc-code-rule';
import {PcCodeRulesComponent} from '../../../../components/pc-code-rules/pc-code-rules.component';

@Component({
  selector: 'app-view-rule-page',
  templateUrl: './view-rule-page.component.html',
  styleUrls: ['./view-rule-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ViewRulePageComponent implements OnInit {
  // rules component
  @ViewChild(PcCodeRulesComponent) pcCodeRulesRef: PcCodeRulesComponent;
  // rules
  rules: PcCodeRule[] = [];

  constructor(
    private ruleService: RuleService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this.getPcCodeRules();
  }

  /**
   * return true when user can click update rules
   */
  get enabled(): boolean {
    return this.pcCodeRulesRef?.marginChanged || this.pcCodeRulesRef?.selectedRules.length > 0;
  }

  /**
   * get pc code rules
   */
  getPcCodeRules(): void {
    const sub = this.ruleService
      .getPcCodeRules()
      .subscribe({
        next: res => this.rules = res,
      });

    this.subscriptionService.store('getPcCodeRules', sub);
  }
}

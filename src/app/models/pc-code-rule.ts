import {PcCodeRuleDetail} from './pc-code-rule-detail';

export interface PcCodeRule {
  pcCode: string;
  pcCodeLevelMargin: number;
  marginAmount: number;
  rules: PcCodeRuleDetail[];
  // for UI
  checked?: boolean;
}

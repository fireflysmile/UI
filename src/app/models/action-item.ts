import {CmCardActionIcon} from '../components/card-action-item/card-action-item.component';

export interface ActionItem {
  // icon
  icon: CmCardActionIcon;
  // label
  label: string;
  // disabled state
  disabled?: () => boolean;
  // hidden state
  hidden?: () => boolean;
  // action
  action: () => void;
  // opened state for UI
  opened?: boolean;
  // more options config
  moreOptionsConfig?: {
    // more options type
    type: 'layout' | 'date-range' | 'date';
    // for layout options
    onSelectHideClick?: () => void;
    onShowHiddenClick?: () => void;
    onReorderClick?: () => void;
    hiddenColumns?: () => number;
    // for date-range options
    startDate?: Date;
    endDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    date?: Date;
    label?: string;
    onApply?: (start: Date, end?: Date) => void;
  };
}

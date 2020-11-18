import {TableColumn} from '../../../models/table-column';
import {LayoutConfig} from '../../../models/layout-config';
import { CollateralDetailsItem } from 'src/app/models/collateral-details-item';
import { CollateralExcessDetailsItem } from 'src/app/models/collateral-excess-details-item';

export const COLLATERAL_DETAILS_INITIAL_COLUMNS: TableColumn<CollateralDetailsItem>[] = [
  new TableColumn<CollateralDetailsItem>('Segment', 'segment'),
  new TableColumn<CollateralDetailsItem>('Instrument Type', 'instrumentType', {displayType: 'instrument-type', info: 'hello'}),
  new TableColumn<CollateralDetailsItem>('Reference Type', 'referenceNo'),
  new TableColumn<CollateralDetailsItem>('Bank', 'bank'),
  new TableColumn<CollateralDetailsItem>('Amount', 'amount'),
  new TableColumn<CollateralDetailsItem>('Maturity Date', 'maturityDate', {filterType: 'date', displayType: 'date'}),

  new TableColumn<CollateralDetailsItem>('TM Code', 'tmCode'),
  new TableColumn<CollateralDetailsItem>('TM Name', 'tmName'),
  new TableColumn<CollateralDetailsItem>('Clietn/CCU Code', 'clientOrCcuCode'),
  new TableColumn<CollateralDetailsItem>('ISIN', 'ISIN'),
  new TableColumn<CollateralDetailsItem>('Security Symbol', 'securitySymbol'),
  new TableColumn<CollateralDetailsItem>('Collateral Type', 'collateralType'),
  new TableColumn<CollateralDetailsItem>('Total Quantity', 'totalQuantity'),
  new TableColumn<CollateralDetailsItem>('Eligible Quantity', 'eligibleQuantity'),
];

export const COLLATERAL_DETAILS_INITIAL_LAYOUT_CONFIGS: LayoutConfig<CollateralDetailsItem>[] = [
  {label: 'Segment', property: 'segment', show: true},
  {label: 'Instrument Type', property: 'instrumentType', show: true},
  {label: 'Reference Type', property: 'referenceNo', show: true},
  {label: 'Bank', property: 'bank', show: true},
  {label: 'Amount', property: 'amount', show: true},
  {label: 'Maturity Date', property: 'maturityDate', show: true},

];


export const COLLATERAL_DETAILS_INITIAL_LAYOUT_CONFIGS_SECURITY: LayoutConfig<CollateralDetailsItem>[] = [
  {label: 'Segment', property: 'segment', show: true},
  {label: 'TM Code', property: 'tmCode', show: true},
  {label: 'TM Name', property: 'tmName', show: true},
  {label: 'Clietn/CCU Code', property: 'clientOrCcuCode', show: true},
  {label: 'ISIN', property: 'ISIN', show: true},
  {label: 'Security Symbol', property: 'securitySymbol', show: true},
  {label: 'Instrument Type', property: 'instrumentType', show: true},
  {label: 'Collateral Type', property: 'collateralType', show: true},
  {label: 'Total Quantity', property: 'totalQuantity', show: true},
  {label: 'Eligible Quantity', property: 'eligibleQuantity', show: true},
];

export const COLLATERAL_EXCESS_DETAILS_INITIAL_COLUMNS: TableColumn<CollateralExcessDetailsItem>[] = [
  new TableColumn<CollateralExcessDetailsItem>('Segment', 'segment'),
  new TableColumn<CollateralExcessDetailsItem>('TM Code', 'tmCode'),
  new TableColumn<CollateralExcessDetailsItem>('Clietn/CCU Code', 'clientOrCcuCode'),
  new TableColumn<CollateralExcessDetailsItem>('Instrument Type', 'instrumentType', {displayType: 'instrument-type', info: 'hello'}),
  new TableColumn<CollateralExcessDetailsItem>('Symbol', 'symbol'),
  new TableColumn<CollateralExcessDetailsItem>('ISIN', 'ISIN'),
  new TableColumn<CollateralExcessDetailsItem>('Series', 'series'),
  new TableColumn<CollateralExcessDetailsItem>('Qty', 'qty'),
  new TableColumn<CollateralExcessDetailsItem>('Valuation Price', 'ValuationPrice'),
  new TableColumn<CollateralExcessDetailsItem>('Gross Value', 'grossValue'),
  new TableColumn<CollateralExcessDetailsItem>('Haircut', 'haircut'),
  new TableColumn<CollateralExcessDetailsItem>('Total effective deposit', 'totalEffectiveDeposit'),
  new TableColumn<CollateralExcessDetailsItem>('OL Limit', 'olLimit'),
  new TableColumn<CollateralExcessDetailsItem>('ML Limit', 'mlLimit'),
  new TableColumn<CollateralExcessDetailsItem>('Total Excess Quantity Due To Qty Based Limits', 'totalExcessQuantityDueToQtyBasedLimits'),
  new TableColumn<CollateralExcessDetailsItem>(
    'Total Excess Value Due To Quantity Based Limits', 'totalExcessValueDueToQuantityBasedLimits'),
  new TableColumn<CollateralExcessDetailsItem>('Net Effective Qty After Qty Limits', 'netEffectiveQtyAfterQtyLimits'),
  new TableColumn<CollateralExcessDetailsItem>('Net Effective Value After Qty Limits', 'netEffectiveValueAfterQtyLimits'),
  new TableColumn<CollateralExcessDetailsItem>('Effective Cash', 'effectiveCash'),
  new TableColumn<CollateralExcessDetailsItem>('LIMIT BASED ON CASH COMPONENT(%)', 'limitBasedOnCashComponent'),
  new TableColumn<CollateralExcessDetailsItem>('Excess Value Due to % Cash Component Limit', 'excessValueDueToCashComponentLimit'),
  new TableColumn<CollateralExcessDetailsItem>(
    'Net Effective Value After % Cash Componnet Limit', 'netEffectiveValueAfterCashComponentLimit'),
  new TableColumn<CollateralExcessDetailsItem>('Limit Based On Total LIQUID Asset(%)', 'limitBasedOnTotalLiquidAsset'),
  new TableColumn<CollateralExcessDetailsItem>('Excess Value Due To % Tla Limit', 'excessValueDueToTlaLimit'),
  new TableColumn<CollateralExcessDetailsItem>('Net Effective Value After % Tla Limit', 'netEffectiveValueAfterTlaLimit'),
  new TableColumn<CollateralExcessDetailsItem>('Limit Based On 50% Cash Component', 'limitBasedOn50CashComponent'),
  new TableColumn<CollateralExcessDetailsItem>('Excess Value Due To 50% Cash Limit', 'excessValueOn50CashLimit'),
  new TableColumn<CollateralExcessDetailsItem>('Total Excess Value Due To Value Based Limit', 'totalExcessValueDueToValueBasedLimit'),
  new TableColumn<CollateralExcessDetailsItem>('Net Effective Deposit', 'netEffectiveDeposit'),

];

export const COLLATERAL_EXCESS_DETAILS_INITIAL_LAYOUT_CONFIGS: LayoutConfig<CollateralExcessDetailsItem>[] = [
  {label: 'Segment', property: 'segment', show: true},
  {label: 'TM Code', property: 'tmCode', show: true},
  {label: 'Clietn/CCU Code', property: 'clientOrCcuCode', show: true},
  {label: 'Instrument Type', property: 'instrumentType', show: true},
  {label: 'Symbol', property: 'symbol', show: true},
  {label: 'ISIN', property: 'ISIN', show: true},
  {label: 'Series', property: 'series', show: true},
  {label: 'Qty', property: 'qty', show: true},
  {label: 'Valuation Price', property: 'ValuationPrice', show: true},
  {label: 'Gross Value', property: 'grossValue', show: true},
  {label: 'Haircut', property: 'haircut', show: true},
  {label: 'Total effective deposit', property: 'totalEffectiveDeposit', show: true},
  {label: 'OL Limit', property: 'olLimit', show: true},
  {label: 'ML Limit', property: 'mlLimit', show: true},
  {label: 'Total Excess Quantity Due To Qty Based Limits', property: 'totalExcessQuantityDueToQtyBasedLimits', show: true},
  {label: 'Total Excess Value Due To Quantity Based Limits', property: 'totalExcessValueDueToQuantityBasedLimits', show: true},
  {label: 'Net Effective Qty After Qty Limits', property: 'netEffectiveQtyAfterQtyLimits', show: true},
  {label: 'Net Effective Value After Qty Limits', property: 'netEffectiveValueAfterQtyLimits', show: true},
  {label: 'Effective Cash', property: 'effectiveCash', show: true},
  {label: 'LIMIT BASED ON CASH COMPONENT(%)', property: 'limitBasedOnCashComponent', show: true},
  {label: 'Excess Value Due to % Cash Component Limit', property: 'excessValueDueToCashComponentLimit', show: true},
  {label: 'Net Effective Value After % Cash Componnet Limit', property: 'netEffectiveValueAfterCashComponentLimit', show: true},
  {label: 'Limit Based On Total LIQUID Asset(%)', property: 'limitBasedOnTotalLiquidAsset', show: true},
  {label: 'Excess Value Due To % Tla Limit', property: 'excessValueDueToTlaLimit', show: true},
  {label: 'Net Effective Value After % Tla Limit', property: 'netEffectiveValueAfterTlaLimit', show: true},
  {label: 'Limit Based On 50% Cash Component', property: 'limitBasedOn50CashComponent', show: true},
  {label: 'Excess Value Due To 50% Cash Limit', property: 'excessValueOn50CashLimit', show: true},
  {label: 'Total Excess Value Due To Value Based Limit', property: 'totalExcessValueDueToValueBasedLimit', show: true},
  {label: 'Net Effective Deposit', property: 'netEffectiveDeposit', show: true}
];


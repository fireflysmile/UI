export interface CollateralExcessDetailsItem {
    segment: string;
    tmCode: string;
    clientOrCcuCode: string;
    instrumentType: string;
    symbol: string;
    ISIN: string;
    series: number;
    qty: number;
    ValuationPrice: number;
    grossValue: number;
    haircut: number;
    totalEffectiveDeposit: number;
    olLimit: number;
    mlLimit: number;
    totalExcessQuantityDueToQtyBasedLimits: number;
    totalExcessValueDueToQuantityBasedLimits: number;
    netEffectiveQtyAfterQtyLimits: number;
    netEffectiveValueAfterQtyLimits: number;
    effectiveCash: number;
    limitBasedOnCashComponent: number;
    excessValueDueToCashComponentLimit: number;
    netEffectiveValueAfterCashComponentLimit: number;
    limitBasedOnTotalLiquidAsset: number;
    excessValueDueToTlaLimit: number;
    netEffectiveValueAfterTlaLimit: number;
    limitBasedOn50CashComponent: number;
    excessValueOn50CashLimit: number;
    totalExcessValueDueToValueBasedLimit: number;
    netEffectiveDeposit: number;
}


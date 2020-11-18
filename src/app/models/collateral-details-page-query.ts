export type CollateralDetailsPageQueryType = 'total' | 'excess' | 'cash' | 'instrument';
export type CollateralTableMode = 'securities' | 'non-securities' | 'excess';
export type CollateralDetailsPageQueryCashType = 'Cash' | 'Non-Cash';

export interface CollateralDetailsPageQuery {
    type: CollateralDetailsPageQueryType;
    // example: ALL, MC, OF, DC
    segment?: string;
    // example: BFD MTX
    instrumentType?: string;
    // table mode
    mode?: CollateralTableMode;
    // top level category of instrument type
    cashType?: CollateralDetailsPageQueryCashType;
}

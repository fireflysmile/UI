export interface CollateralDetailsItem {
    // common fields
    segment: string;
    instrumentType: string;

    // non-security fields
    instrumentNo: number;
    referenceNo: number;
    bank: string;
    amount: number;
    maturityDate: string;

    // security fields
    tmCode: string;
    tmName: string;
    clientOrCcuCode: string;
    ISIN: string;
    securitySymbol: string;
    collateralType: string;
    totalQuantity: string;
    eligibleQuantity: string;
}


import { CommonHash } from '../models/common-hash';

export interface InstrumentTypeConstant {
    fullName: string;
    category: string;
    name: string;
}

export const instrumentTypeConstants: CommonHash<InstrumentTypeConstant> = {
    BFD: {
        fullName: 'Bank Fixed Deposit',
        category: 'Cash',
        name: 'BFD'
    },
    BGN: {
        fullName: 'Bank Guarnatee',
        category: 'Cash',
        name: 'BGN'
    },
    CHQ: {
        fullName: 'Cash Deposit',
        category: 'Cash',
        name: 'CHQ'
    },
    IFS: {
        fullName: 'Interest Free Securities Deposit',
        category: 'Cash',
        name: 'IFS'
    },
    TMD: {
        fullName: 'Trading Member Deposit',
        category: 'Cash',
        name: 'TMD'
    },
    MTX: {
        fullName: 'Margin Transactions	',
        category: 'Cash',
        name: 'MTX'
    },
    GSE: {
        fullName: 'Governemnt Securities',
        category: 'Cash',
        name: 'GSE'
    },
    CMF: {
        fullName: 'Cash Mutual Fund',
        category: 'Cash',
        name: 'CMF'
    },
    GMF: {
        fullName: 'Gilt Mutual Fund',
        category: 'Cash',
        name: 'GMF'
    },
    NMF: {
        fullName: 'Non-Cash Mutual Fund',
        category: 'Non-Cash',
        name: 'NMF'
    },
    OMF: {
        fullName: 'Non GILT MF / Other Mutual Funds',
        category: 'Non-Cash',
        name: 'OMF'
    },
    SDP: {
        fullName: 'Securiries',
        category: 'Non-Cash',
        name: 'SDP'
    },
    INM: {
        fullName: 'Institutional Securities',
        category: 'Cash',
        name: 'INM'
    },
    WDM: {
        fullName: 'WDM Deposit',
        category: 'Cash',
        name: 'WDM'
    },
    FSS: {
        fullName: 'Foreign sovreign securities',
        category: 'Non-Cash',
        name: 'FSS'
    },
    BLN: {
        fullName: 'Bullion Collaterels ',
        category: 'Non-Cash',
        name: 'BLN'
    },
};

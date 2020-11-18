import { SegmentWiseUtiliztion } from './segment-wise-utilization';
import { CollateralValueAnalysis } from './collateral-value-analysis';
import { ValueBasedExcess } from './value-based-excess';
import { ByInstrumentType } from './by-instrument-type';
import { MaturityTimeline } from './maturity-timeline';
import { DetailedValueBasedExcess } from './detailed-value-based-excess';
import { InstrumentLevelDetail } from './Instrument-level-detail';

export interface Collateral {
    segmentWiseUtilization: SegmentWiseUtiliztion;
    collateralValueAnalysis: CollateralValueAnalysis;
    valueBasedExcess: ValueBasedExcess[];
    byInstrumentType: ByInstrumentType;
    maturityTimeline: MaturityTimeline;
    detailedValueBasedExcess: DetailedValueBasedExcess;
    instrumentLevelDetail: InstrumentLevelDetail;
}

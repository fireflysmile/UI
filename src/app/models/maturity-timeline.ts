export type MaturityTimelinePhase = 'today' | 'history' | 'twoWeeks' | 'month' | 'onwards';

export interface MaturityTimeline {
    instrument?: string;
    segment?: string;
    phase?: MaturityTimelinePhase;
    expiredAt: string;
    value: number;
}

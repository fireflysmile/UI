export type TsColumnSortDirection = 'asc' | 'desc';

/**
 * column sort event
 */
export class TsColumnSortEvent {
  [key: string]: TsColumnSortDirection;
}

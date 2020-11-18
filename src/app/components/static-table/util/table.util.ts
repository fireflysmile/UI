import {TsColumnSortEvent} from '../models/ts-column-sort-event';
import {TsSortEventItem} from '../models/ts-sort-event-item';

/**
 * transform sort event to list
 * @param event sort event
 */
export function sortEventToList(event: TsColumnSortEvent): TsSortEventItem[] {
  return Object.keys(event)
    .filter(key => event[key])
    .map(key => ({
      property: key,
      order: event[key],
    }));
}

// modal data injection key
export const TS_MODAL_DATA = 'TS_MODAL_DATA';

// modal ref injection key
export const TS_MODAL_REF = 'TS_MODAL_REF';

// modal position
export type TsModalPosition = 'center' | 'top';

export interface TsModalOptions {
  // set modal data
  data?: any;
  // set modal position
  // default is top
  position?: TsModalPosition;
  // set close callback
  onClose?: (returns?: any) => void;
  // set true to suppress close on click outside
  suppressCloseOnClickOutside?: boolean;
}

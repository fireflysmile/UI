import {OtrAllocation} from './otr-allocation';

export interface OtrAllocationDetail {
  totalQty: number;
  totalValue: number;
  // available pc codes
  pcCodes: string[];
  allocations: OtrAllocation[];
}

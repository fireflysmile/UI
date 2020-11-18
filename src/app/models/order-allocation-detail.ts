import {OrderAllocation} from './order-allocation';

export interface OrderAllocationDetail {
  totalQty: number;
  totalValue: number;
  allocations: OrderAllocation[];
}

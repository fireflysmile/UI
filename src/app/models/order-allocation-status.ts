export interface OrderAllocationStatus {
  unallocated: number;
  allocated: {
    unconfirmed: number;
    rejected: number;
    confirmed: number;
    deConfirmed: number;
  };
}

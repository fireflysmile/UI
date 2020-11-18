export interface OtrAllocationStatus {
  unallocated: number;
  allocated: {
    unconfirmed: number;
    rejected: number;
    confirmed: number;
  };
}

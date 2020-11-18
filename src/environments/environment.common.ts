export const commonEnvironments = {
  // request status config
  requestStatusConfig: {
    successful: {
      value: 'Successful',
      color: '#12BE34',
    },
    pending: {
      value: 'Pending',
      color: '#FF7600',
    },
    unsuccessful: {
      value: 'Unsuccessful',
      color: '#E31F26',
    },
    canceled: {
      value: 'Canceled',
      color: '#E31F26',
    },
  },
  // collateral config
  collateralConfig: {
    marginDeposit: {
      value: 'MARGIN DEPOSIT',
      label: 'Margin Deposit',
    },
    securityDeposit: {
      value: 'SECURITY DEPOSIT',
      label: 'Security Deposit',
    },
  },
  // segment config
  segmentConfig: {
    cm: {
      value: 'MC',
      label: 'MC',
    },
    fo: {
      value: 'FO',
      label: 'FO',
    },
    cd: {
      value: 'CD',
      label: 'CD',
    },
    co: {
      value: 'CO',
      label: 'CO',
    },
    slb: {
      value: 'SLB',
      label: 'SLB',
    },
  },
  // instrument type config
  instrumentTypeConfig: {
    securities: {
      value: 'SECURITIES',
      label: 'Securities',
    },
    cash: {
      value: 'CASH',
      label: 'Cash',
    },
    fd: {
      value: 'FDP',
      label: 'FD',
    },
    bg: {
      value: 'BGN',
      label: 'BG',
    },
    gsec: {
      value: 'GSEC',
      label: 'GSec',
    },
  },
  // request type config
  requestTypeConfig: {
    all: {
      value: 'all',
      label: 'All',
    },
    kcarAllocation: {
      value: 'kcarAllocation',
      label: 'Kcar Allocation',
    },
    kcarSurrender: {
      value: 'kcarSurrender',
      label: 'Kcar Surrender',
    },
    piActivation: {
      value: 'piActivation',
      label: 'PI Activation',
    },
    piSurrender: {
      value: 'piSurrender',
      label: 'PI Surrender',
    },
    mrc: {
      value: 'mrc',
      label: 'MRC',
    },
    noitacoloc: {
      value: 'noitacoloc',
      label: 'Noitacoloc PTP Request',
    },
    tmEnrollment: {
      value: 'tmEnrollment',
      label: 'TM Enrollment',
    },
    tmDeactivation: {
      value: 'tmDeactivation',
      label: 'TM Deactivation',
    },
  },
  // time options
  timeOptions: [
    '00:00',
    '00:15',
    '00:30',
    '00:45',
    '01:00',
    '01:15',
    '01:30',
    '01:45',
    '02:00',
    '02:15',
    '02:30',
    '02:45',
    '03:00',
    '03:15',
    '03:30',
    '03:45',
    '04:00',
    '04:15',
    '04:30',
    '04:45',
    '05:00',
    '05:15',
    '05:30',
    '05:45',
    '06:00',
    '06:15',
    '06:30',
    '06:45',
    '07:00',
    '07:15',
    '07:30',
    '07:45',
    '08:00',
    '08:15',
    '08:30',
    '08:45',
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45',
    '19:00',
    '19:15',
    '19:30',
    '19:45',
    '20:00',
    '20:15',
    '20:30',
    '20:45',
    '21:00',
    '21:15',
    '21:30',
    '21:45',
    '22:00',
    '22:15',
    '22:30',
    '22:45',
    '23:00',
    '23:15',
    '23:30',
    '23:45',
    '23:59',
  ],
  // watching interval to refresh data with API
  watchingInterval: 5000,
  // collateral watching interval to refresh data with API
  collateralWatchingInterval: 45000,
  // tslint:disable-next-line:max-line-length
  memberUndertakingAgreement: '1. I/We hereby confirm that the proposed designated director do not hold the designation of a designated director in any other corporate.\n2. I/We hereby confirm that we have verified the educational qualification of the proposed designated director and the same meets the eligibility criteria of the Exchange. \n3. I/We hereby confirm that the proposed director/(s) is not engaged in any business other than that of dealing in shares & securities or stock brokerage.\n4. I We hereby confirm that the proposed director/(s) were/are not debarred and/or no action were/are initiated against them by the Securities and Exchange Board of India from associating from the securities market and such person shall not be associated with us in future also.\n5. I/We hereby confirm that the proposed director/(s) is/are ‘fit and proper person’ as per Schedule II of SEBI (Intermediaries) Regulations, 2008 and SEBI (Stock Brokers & Sub-brokers) Regulations, 1992 as amended till date including with reference to following criteria: i) integrity, reputation and character; ii) absence of conviction and restraint orders; iii) competence including financial solvency and net worth; iv) absence of categorization as a wilful defaulter.',
  processingFeesAgreements: [
    // tslint:disable-next-line:max-line-length
    'We hereby confirm that we have paid the entire outstanding principal fees and interest to SEBI and in respect of all erstwhile entities, if any.',
    // tslint:disable-next-line:max-line-length
    'I have transferred a total of INR 9440 to NSE’s a/c which includes INR 4000 plus 18% GST towards processing fees for 4 change(s) in non-designated director and INR 4000 plus 18% GST towards processing fees for 2 change(s) in designated director for which details of the transaction reference number are given below.'
  ],
  backgroundCheckRiskConfig: {
    low: '#27930D',
    medium: '#FF7600',
    high: '#CB0000'
  },
  educationalQualificationOptions: [
    'Class 12',
    'Graduate',
    'Post-Graduate',
    'Professional'
  ],
  // application approval statuses
  applicationApprovalStatuses: {
    WITH_MAKER: 'With Maker',
    WITH_CHECKER: 'With Checker',
    REJECTED: 'Rejected',
    APPROVED: 'Approval Granted'
  },
  applicationPostImplementationStatus: {
    PENDING: 'Implementation Pending',
    INCORPORATED: 'Change incorporated',
    INCORPORATED_AFTER_DEADLINE: 'Change incorporated after deadline',
    NOT_FOUND: 'MCA Record not found',
    POST_FACTO: 'Post-facto change identified'
  },
  // request extension uploader config
  requestExtensionUploaderConfig: {
    accepts: [
      'application/pdf',
      'image/jpeg',
    ],
    limits: 2097152,
  },
  // dir 12 uploader config
  dir12UploaderConfig: {
    accepts: [
      'application/pdf',
      'image/jpeg',
    ],
    limits: 5242880,
  },
  // otr allocation uploader config
  otrAllocationUploaderConfig: {
    accepts: [
      '.csv',
      'text/csv',
      'application/vnd.ms-excel',
    ],
  },
  // pc modification uploader config
  pcModificationUploaderConfig: {
    accepts: [
      '.csv',
      'text/csv',
      'application/vnd.ms-excel',
    ],
  },
  // pc client map uploader config
  pcClientMapUploaderConfig: {
    accepts: [
      '.csv',
      'text/csv',
      'application/vnd.ms-excel',
    ],
  },
  // pc rule uploader config
  pcRuleUploaderConfig: {
    accepts: [
      '.csv',
      'text/csv',
      'application/vnd.ms-excel',
    ],
  },
};



export interface AccountBalance {
  amount: number;
  type: 'Available' | 'Current';
}

export interface AccountBalanceResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: {
    currency: CurrencyCode;
    balances: [AccountBalance, AccountBalance];
  };
}

export interface AccountTransaction {
  date: Date;
  amount: number;
  description: string;
  chequeNumber: string | undefined | null;
  type: 'Debit' | 'Credit';
}

export interface AccountMiniStatementResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: {
    balance: number;
    currency: CurrencyCode;
    accountNumber: string;
    transactions: AccountTransaction[];
  };
}

export interface AccountFullStatementResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: {
    balance: number;
    currency: CurrencyCode;
    accountNumber: string;
    transactions: AccountTransaction[];
  };
}

export interface AccountOpeningAndClosingBalanceResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: {
    balance: number;
    currency: CurrencyCode;
    accountNumber: string;
    transactions: AccountTransaction[];
  };
}

export interface AccountInquiryResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: {
    account: {
      branchCode: string;
      number: string;
      currency: CurrencyCode;
      status: AccountStatus;
    };
    customer: {
      name: string;
      id: string;
      type: CustomerType;
    }[];
  };
}
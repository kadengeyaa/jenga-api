import { ResponseMessage } from './general.interface.js';

export interface SendMoneyWithinEquityBankResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: { transactionId: string; status: 'SUCCESS' };
}

export interface SendMoneyToMobileWalletResponse {
  status: boolean;
  code: -1;
  message: string;
  transactionId: string;
}

export interface SendMoneyRTGSResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: { transactionId: string; status: 'SUCCESS' };
}
export interface SendMoneySWIFTResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: { transactionId: string; status: 'SUCCESS' };
}

export interface SendMoneyPesaLinkToBankAccountResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: { description: string; transactionId: string; status: 'SUCCESS' };
}

export interface SendMoneyPesaLinkToMobileNumberResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: { description: string; transactionId: string; status: 'SUCCESS' };
}

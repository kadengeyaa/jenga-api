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
  transactionId: '7878787878787879';
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

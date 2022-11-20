import { ResponseMessage } from './general.interface.js';

export interface SendMoneyWithinEquityBankResponse {
  status: boolean;
  code: number;
  message: ResponseMessage;
  data: { transactionId: string; status: 'SUCCESS' };
}

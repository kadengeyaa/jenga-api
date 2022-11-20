import { SignOptions, SignService } from './sign.service.js';
import { AuthService } from './auth.service.js';
import axios from 'axios';
import { URLConfig } from '../config/url.config.js';
import { LoggerUtil } from '../util/logger.js';
import { AuthOptions } from '../interface/auth.interface.js';
import {
  SendMoneyToMobileWalletResponse,
  SendMoneyWithinEquityBankResponse,
} from '../interface/sendMoney.interface.js';
import { CountryCode, CurrencyCode } from '../interface/general.interface.js';
import moment from 'moment';

export abstract class SendMoneyService {
  static async sendMoneyWithinEquityBank(
    data: {
      source: {
        countryCode: CountryCode;
        name: string;
        accountNumber: string;
      };
      destination: {
        type: 'bank';
        countryCode: CountryCode;
        name: string;
        accountNumber: string;
      };
      transfer: {
        type: 'InternalFundsTransfer';
        amount: number;
        currencyCode: CurrencyCode;
        reference: string;
        date: Date;
        description: string;
      };
    },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<SendMoneyWithinEquityBankResponse> {
    const {
      source: { accountNumber },
      transfer: { amount, currencyCode, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(
      `${accountNumber}${amount}${currencyCode}${reference}`,
      options?.signOptions,
    );

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: SendMoneyWithinEquityBankResponse = (
      await axios({
        method: 'post',
        url: URLConfig.kSendMoneyWithinEquityBank,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          'Content-Type': 'application/json',
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    LoggerUtil.logger.log('jenga-sendMoneyWithinEquityBank %o', response);

    return response;
  }

  static async sendToMobileWallet(
    data: {
      source: {
        countryCode: CountryCode;
        name: string;
        accountNumber: string;
      };
      destination: {
        type: 'mobile';
        countryCode: CountryCode;
        name: string;
        mobileNumber: string;
        walletName: 'Mpesa' | 'Airtel' | 'Equitel';
      };
      transfer: {
        type: 'MobileWallet';
        amount: number;
        currencyCode: CurrencyCode;
        reference: string;
        date: Date;
        description: string;
      };
    },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<SendMoneyToMobileWalletResponse> {
    const {
      source: { accountNumber },
      destination: { walletName },
      transfer: { amount, currencyCode, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(
      walletName === 'Equitel'
        ? `${amount}${currencyCode}${reference}${accountNumber}`
        : `${accountNumber}${amount}${currencyCode}${reference}`,
      options?.signOptions,
    );

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const rawResponse: Record<string, unknown> = (
      await axios({
        method: 'post',
        url: URLConfig.kSendMoneyToMobileWallet,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          'Content-Type': 'application/json',
        },
        data: {
          ...data,
          ...{ transfer: { ...data.transfer, ...{ date } } },
        },
      })
    ).data;

    rawResponse['transactionId'] = rawResponse['transactionId '];

    delete rawResponse['transactionId '];

    const response: SendMoneyToMobileWalletResponse = rawResponse as unknown as SendMoneyToMobileWalletResponse;

    LoggerUtil.logger.log('jenga-sendMoneyToMobileWallet %o', response);

    return response;
  }
}

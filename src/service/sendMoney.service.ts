import { SignOptions, SignService } from './sign.service.js';
import { AuthService } from './auth.service.js';
import axios from 'axios';
import { URLConfig } from '../config/url.config.js';
import { LoggerUtil } from '../util/logger.js';
import { AuthOptions } from '../interface/auth.interface.js';
import {
  SendMoneyPesaLinkToBankAccountResponse,
  SendMoneyPesaLinkToMobileNumberResponse,
  SendMoneyRTGSResponse,
  SendMoneySWIFTResponse,
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

  static async sendMoneyRTGS(
    data: {
      source: {
        countryCode: CountryCode;
        name: string;
        accountNumber: string;
        currency: CurrencyCode;
      };
      destination: {
        type: 'bank';
        countryCode: CountryCode;
        name: string;
        bankCode: string;
        accountNumber: string;
      };
      transfer: {
        type: 'RTGS';
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
  ): Promise<SendMoneyRTGSResponse> {
    const {
      source: { accountNumber },
      destination: { accountNumber: destinationAccountNumber },
      transfer: { amount, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(
      `${reference}${date}${accountNumber}${destinationAccountNumber}${amount}`,
      options?.signOptions,
    );

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: SendMoneyRTGSResponse = (
      await axios({
        method: 'post',
        url: URLConfig.kSendMoneyRTGS,
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

    LoggerUtil.logger.log('jenga-sendMoneyRTGS %o', response);

    return response;
  }

  static async sendMoneySWIFT(
    data: {
      source: {
        countryCode: CountryCode;
        name: string;
        accountNumber: string;
        sourceCurrency: CurrencyCode;
      };
      destination: {
        type: 'bank';
        countryCode: CountryCode;
        name: string;
        bankBic: string;
        accountNumber: string;
        addressline1: string;
        currency: CurrencyCode;
      };
      transfer: {
        type: 'SWIFT';
        amount: number;
        currencyCode: CurrencyCode;
        reference: string;
        date: Date;
        description: string;
        chargeOption: 'SELF';
      };
    },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<SendMoneySWIFTResponse> {
    const {
      source: { accountNumber },
      destination: { accountNumber: destinationAccountNumber },
      transfer: { amount, reference, date: dateToFormat },
    } = data;

    const date = moment.utc(dateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(
      `${reference}${date}${accountNumber}${destinationAccountNumber}${amount}`,
      options?.signOptions,
    );

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: SendMoneySWIFTResponse = (
      await axios({
        method: 'post',
        url: URLConfig.kSendMoneySWIFT,
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

    LoggerUtil.logger.log('jenga-sendMoneySWIFT %o', response);

    return response;
  }

  static async sendMoneyPesaLinkToBankAccount(
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
        bankCode: string;
        accountNumber: string;
      };
      transfer: {
        type: 'PesaLink';
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
  ): Promise<SendMoneyPesaLinkToBankAccountResponse> {
    const {
      source: { accountNumber },
      destination: { name: destinationName },
      transfer: { amount, reference, date: dateToFormat, currencyCode },
    } = data;

    const date = moment.utc(dateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(
      `${amount}${currencyCode}${reference}${destinationName}${accountNumber}`,
      options?.signOptions,
    );

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: SendMoneyPesaLinkToBankAccountResponse = (
      await axios({
        method: 'post',
        url: URLConfig.kSendMoneyPesalinkToBankAccount,
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

    LoggerUtil.logger.log('jenga-sendMoneyPesaLink %o', response);

    return response;
  }

  static async sendMoneyPesaLinkToMobileNumber(
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
        bankCode: string;
        accountNumber: string;
      };
      transfer: {
        type: 'PesaLink';
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
  ): Promise<SendMoneyPesaLinkToMobileNumberResponse> {
    const {
      source: { accountNumber },
      destination: { name: destinationName },
      transfer: { amount, reference, date: dateToFormat, currencyCode },
    } = data;

    const date = moment.utc(dateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(
      `${amount}${currencyCode}${reference}${destinationName}${accountNumber}`,
      options?.signOptions,
    );

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: SendMoneyPesaLinkToMobileNumberResponse = (
      await axios({
        method: 'post',
        url: URLConfig.kSendMoneyPesalinkToMobileNumber,
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

    LoggerUtil.logger.log('jenga-sendMoneyPesaLink %o', response);

    return response;
  }
}

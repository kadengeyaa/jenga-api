import { SignOptions, SignService } from './sign.service.js';
import { AuthService } from './auth.service.js';
import axios from 'axios';
import { URLConfig } from '../config/url.config.js';
import { LoggerUtil } from '../util/logger.js';
import moment from 'moment';
import {
  AccountBalanceResponse,
  AccountFullStatementResponse,
  AccountInquiryResponse,
  AccountMiniStatementResponse,
  AccountOpeningAndClosingBalanceResponse,
} from '../interface/account.interface.js';
import { AuthOptions } from '../interface/auth.interface.js';

export abstract class AccountService {
  static async getBalance(
    data: { countryCode: CountryCode; accountNumber: string },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<AccountBalanceResponse> {
    const { countryCode, accountNumber } = data;

    const signature = SignService.getSignature(`${countryCode}${accountNumber}`, options?.signOptions);

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: AccountBalanceResponse = (
      await axios({
        method: 'get',
        url: `${URLConfig.kAccountBalance}/${countryCode}/${accountNumber}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          'Content-Type': 'application/json',
        },
      })
    ).data;

    LoggerUtil.logger.log('jenga-getBalance %o', response);

    return response;
  }

  static async getMiniStatement(
    data: { countryCode: CountryCode; accountNumber: string },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<AccountMiniStatementResponse> {
    const { countryCode, accountNumber } = data;

    const signature = SignService.getSignature(`${countryCode}${accountNumber}`, options?.signOptions);

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: AccountMiniStatementResponse = (
      await axios({
        method: 'get',
        url: `${URLConfig.kAccountMiniStatement}/${countryCode}/${accountNumber}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          'Content-Type': 'application/json',
        },
      })
    ).data;

    LoggerUtil.logger.log('jenga-getMiniStatement %o', response);

    const {
      data: { transactions },
    } = response;

    return {
      ...response,
      ...{
        data: {
          ...response.data,
          ...{
            transactions: transactions.map((transaction) => {
              const { date, amount } = transaction;

              return { ...transaction, ...{ date: moment.utc(date).toDate(), amount: parseFloat(amount.toString()) } };
            }),
          },
        },
      },
    };
  }

  static async getFullStatement(
    data: { countryCode: CountryCode; accountNumber: string; fromDate: Date; toDate: Date; limit: number },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<AccountFullStatementResponse> {
    const { countryCode, accountNumber, fromDate: fromDateToFormat, toDate: toDateToFormat, limit } = data;

    const fromDate = moment.utc(fromDateToFormat).format('YYYY-MM-DD');
    const toDate = moment.utc(toDateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(`${countryCode}${accountNumber}${toDate}`, options?.signOptions);

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: AccountFullStatementResponse = (
      await axios({
        method: 'post',
        url: `${URLConfig.kAccountFullStatement}/${countryCode}/${accountNumber}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          'Content-Type': 'application/json',
        },
        data: {
          countryCode,
          accountNumber,
          fromDate,
          toDate,
          limit,
        },
      })
    ).data;

    LoggerUtil.logger.log('jenga-getFullStatement %o', response);

    const {
      data: { transactions },
    } = response;

    return {
      ...response,
      ...{
        data: {
          ...response.data,
          ...{
            transactions: transactions.map((transaction) => {
              const { date, amount } = transaction;

              return { ...transaction, ...{ date: moment.utc(date).toDate(), amount: parseFloat(amount.toString()) } };
            }),
          },
        },
      },
    };
  }

  static async getOpeningAndClosingBalance(
    data: { countryCode: CountryCode; accountNumber: string; date: Date },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<AccountOpeningAndClosingBalanceResponse> {
    const { countryCode, accountNumber: accountId, date: dateToFormat } = data;

    const date = moment.utc(dateToFormat).format('YYYY-MM-DD');

    const signature = SignService.getSignature(`${countryCode}${accountId}${date}`, options?.signOptions);

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: AccountOpeningAndClosingBalanceResponse = (
      await axios({
        method: 'post',
        url: URLConfig.kAccountOpeningAndClosingBalance,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          'Content-Type': 'application/json',
        },
        data: {
          countryCode,
          accountId,
          date,
        },
      })
    ).data;

    LoggerUtil.logger.log('jenga-getOpeningAndClosingBalance %o', response);

    const {
      data: { transactions },
    } = response;

    return {
      ...response,
      ...{
        data: {
          ...response.data,
          ...{
            transactions: transactions.map((transaction) => {
              const { date, amount } = transaction;

              return { ...transaction, ...{ date: moment.utc(date).toDate(), amount: parseFloat(amount.toString()) } };
            }),
          },
        },
      },
    };
  }

  static async getInquiry(
    data: { countryCode: CountryCode; accountNumber: string },
    options?: {
      authOptions?: AuthOptions;
      signOptions?: SignOptions;
    },
  ): Promise<AccountInquiryResponse> {
    const { countryCode, accountNumber } = data;

    const signature = SignService.getSignature(`${countryCode}${accountNumber}`, options?.signOptions);

    const { accessToken } = await AuthService.getAuth(options?.authOptions);

    const response: AccountInquiryResponse = (
      await axios({
        method: 'get',
        url: `${URLConfig.kAccountInquiry}/${countryCode}/${accountNumber}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          'Content-Type': 'application/json',
        },
      })
    ).data;

    LoggerUtil.logger.log('jenga-getBalance %o', response);

    return response;
  }
}

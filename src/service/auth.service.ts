import axios from 'axios';
import moment from 'moment';
import { EvnConfig } from '../config/env.config.js';
import { URLConfig } from '../config/url.config.js';
import { AuthOptions, AuthResponse } from '../interface/auth.interface.js';
import { LoggerUtil } from '../util/logger.js';

export abstract class AuthService {
  static async getAuth(options?: AuthOptions): Promise<AuthResponse> {
    const merchantCode: string | undefined = options?.merchantCode || EvnConfig.kMerchantCode;
    const consumerSecret: string | undefined = options?.consumerSecret || EvnConfig.kConsumerSecret;

    if (!merchantCode) throw new Error('Jenga! Please provide the merchant code');

    if (!consumerSecret) throw new Error('Jenga! Please provide the consumer secret');

    const response: AuthResponse = (
      await axios({
        method: 'post',
        url: URLConfig.kAuthToken,
        data: {
          merchantCode,
          consumerSecret,
        },
      })
    ).data;

    LoggerUtil.logger.log('jenga-getAuth %o', response);

    const { expiresIn: expiresInText, issuedAt: issuedAtText } = response;

    return {
      ...response,
      ...{
        expiresIn: moment.utc(expiresInText).toDate(),
        issuedAt: moment.utc(issuedAtText).toDate(),
      },
    };
  }
}

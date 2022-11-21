import { readFileSync } from 'fs';
import { sign, verify } from 'crypto';
import { EvnConfig } from '../config/env.config.mjs';
import { resolve } from 'path';
import { LoggerUtil } from '../util/logger.mjs';

export interface SignOptions {
  pathToPrivateKey?: string;
  pathToPublicKey?: string;
}

export abstract class SignService {
  static getSignature(data: string, options?: SignOptions): string {
    const pathToPrivateKey: string | undefined = options?.pathToPublicKey || EvnConfig.kJengaPathToPublicKey;

    if (!pathToPrivateKey) throw new Error('Jenga! Please provide the path to private key');

    const privateKey = readFileSync(resolve(pathToPrivateKey));

    const signature = sign('sha256', Buffer.from(data), {
      key: privateKey,
    }).toString('base64');

    LoggerUtil.logger.info('jenga-getSignature %o', signature);

    const pathToPublicKey: string | undefined = options?.pathToPublicKey || EvnConfig.kJengaPathToPublicKey;

    if (pathToPublicKey) {
      const publicKey = readFileSync(resolve(pathToPublicKey));

      const isVerified = verify(
        'sha256',
        Buffer.from(data),
        {
          key: publicKey,
        },
        Buffer.from(signature, 'base64'),
      );

      LoggerUtil.logger.info('jenga-getSignature verified %o', isVerified);
    }

    return signature;
  }
}

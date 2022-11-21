export abstract class EvnConfig {
  static kEnv = process.env['kJengaEnv'] as 'sandbox' | 'production';
  static kLogLevel = process.env['kJengaLogLevel'] as string | undefined;
  static kMerchantCode = process.env['kJengaMerchantCode'] as string | undefined;
  static kConsumerSecret = process.env['kJengaConsumerSecret'] as string | undefined;
  static kJengaPathToPrivateKey = process.env['kJengaPathToPrivateKey'] as string | undefined;
  static kJengaPathToPublicKey = process.env['kJengaPathToPublicKey'] as string | undefined;
}

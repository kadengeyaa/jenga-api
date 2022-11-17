export abstract class EvnConfig {
  static kEnv = process.env['JENGA_ENV'] as 'sandbox' | 'production';
}

import winston, { Logger } from 'winston';
import { EvnConfig } from '../config/env.config.mjs';

export abstract class LoggerUtil {
  static logger: Logger = winston.createLogger({
    level: EvnConfig.kLogLevel,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
    ),
    transports:
      EvnConfig.kEnv === 'production'
        ? new winston.transports.Console()
        : new winston.transports.Console({
            format: winston.format.combine(winston.format.cli(), winston.format.splat()),
          }),
  });
}

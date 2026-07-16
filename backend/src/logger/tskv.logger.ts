import { LoggerService, Injectable } from '@nestjs/common';

const LEVEL_KEY = 'level';
const MESSAGE_KEY = 'message';
const PARAMS_KEY = 'optionalParams';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: unknown, ...optionalParams: unknown[]) {
    const paramsValue =
      optionalParams.length > 0 ? JSON.stringify(optionalParams) : '';
    const parts = [
      `${LEVEL_KEY}=${level}`,
      `${MESSAGE_KEY}=${typeof message === 'string' ? message : JSON.stringify(message)}`,
    ];
    if (paramsValue !== '') {
      parts.push(`${PARAMS_KEY}=${paramsValue}`);
    }
    return parts.join('\t');
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}

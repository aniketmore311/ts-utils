import { promises as fsp } from 'fs';
import os from 'os'

const logLevelMap = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
};

export type ILogLevel = "debug" | "info" | "warning" | "error";

export type IObjectType = { [key: string]: any }

export type ILogInfo = {
  message: string;
  logLevel: ILogLevel;
  timeStamp: Date;
  logObj?: IObjectType;
};

export type IStrategy = (logInfo: ILogInfo) => Promise<void>;

export class Logger {
  private logLevel: ILogLevel;
  private strategies: IStrategy[] = [];

  constructor(opts?: { logLevel: ILogLevel }) {
    this.logLevel = "debug";
    if (opts && opts.logLevel) {
      this.logLevel = opts.logLevel
    }
  }

  public addStrategy(strategy: IStrategy): void {
    this.strategies.push(strategy);
  }

  public async log(
    logLevel: ILogLevel,
    message: string,
    logObj?: IObjectType
  ): Promise<void> {
    const timeStamp = new Date();
    if (logLevelMap[logLevel] >= logLevelMap[this.logLevel]) {
      try {
        await Promise.all(this.strategies.map(async (strategy) => {
          await strategy({ message, logLevel, logObj, timeStamp });
        }))
      } catch (err) {
        throw err
      }
    }
  }

  public async debug(message: string, logObj?: IObjectType): Promise<void> {
    await this.log('debug', message, logObj);
  }

  public async info(message: string, logObj?: IObjectType): Promise<void> {
    await this.log('info', message, logObj);
  }

  public async warning(message: string, logObj?: IObjectType): Promise<void> {
    await this.log('warning', message, logObj);
  }

  public async error(message: string, logObj?: IObjectType): Promise<void> {
    await this.log('error', message, logObj);
  }
}

export type FileStrategyOpts = { logLevel: ILogLevel }
export function makeFileStrategy(filePath: string, opts?: FileStrategyOpts): IStrategy {
  let loglevel: ILogLevel = "debug"
  if (opts && opts.logLevel) {
    loglevel = opts.logLevel
  }
  return async function (logInfo: ILogInfo) {
    if (logLevelMap[logInfo.logLevel] >= logLevelMap[loglevel]) {
      const logItem = {
        msg: logInfo.message,
        level: logInfo.logLevel,
        timestamp: logInfo.timeStamp.toISOString(),
        ...logInfo.logObj,
      };
      await fsp.appendFile(filePath, JSON.stringify(logItem) + os.EOL);
    }
  };
}

export type ConsoleStrategyOpts = { logLevel: ILogLevel }
export function makeConsoleStrategy(opts?: ConsoleStrategyOpts): IStrategy {
  let loglevel: ILogLevel = "debug"
  if (opts && opts.logLevel) {
    loglevel = opts.logLevel
  }
  const levelColorMap = {
    debug: '\x1b[32m',
    info: '\x1b[36m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    reset: '\x1b[0m',
  };
  return async function (logInfo: ILogInfo) {
    if (logLevelMap[logInfo.logLevel] >= logLevelMap[loglevel]) {
      let logObjStr: string = logInfo.logObj === undefined ? "" : JSON.stringify(logInfo.logObj, null, 2) + os.EOL;
      process.stdout.write(
        `${levelColorMap[logInfo.logLevel]}${logInfo.logLevel.toUpperCase()}\t:${levelColorMap['reset']
        } ${logInfo.message}${os.EOL}${logObjStr}`,
        'utf-8'
      );
    }
  };
}

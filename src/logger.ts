import {
  createLogger,
  format,
  transports
} from 'winston';

import winston = require('winston');

const logTransports = [
  new transports.File({
    level: 'error',
    filename: './logs/error.log',
    format: format.json({
      replacer: (key, value) => {
        if (key === 'error') {
          return {
            message: (value as Error).message,
            stack: (value as Error).stack
          };
        }
        return value;
      }
    })
  }),
  new transports.Console({
    level: 'debug',

    format: format.prettyPrint()
  })
];

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'magenta',
    warn: 'yellow',
    data: 'grey',
    info: 'cyan',
    verbose: 'green',
    silly: 'magenta',
    custom: 'yellow'
  }
};

winston.addColors(config.colors);

const logger = createLogger({

  levels: config.levels,
  level: 'custom',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
    winston.format.timestamp(),
    // winston.format.json()
  ),
  defaultMeta: { service: 'api-server' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});

export default logger;

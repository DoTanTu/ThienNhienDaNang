import { Logger, transports } from 'winston';

var logger = new Logger({
  transports: [
    new transports.Console(),
    new transports.File ({ filename: 'logger.log' })
  ]
});

export default logger;
import { Logger, createLogger, format, transports } from 'winston';

export const logger: Logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console()
  ],
});

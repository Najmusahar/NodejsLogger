import winston from 'winston';
//mport pino from 'pino';
const { combine, timestamp, json,label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
  // Check if there is a stack trace (for errors) and include it in the log message
  const logMessage = stack ? `${timestamp} [${label}] ${level}: ${message} - ${stack}` : `${timestamp} [${label}] ${level}: ${message}`;
  return logMessage;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  //format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  format: combine(
    label({ label: 'BOBO!' }),
    timestamp(),
    json(),
    myFormat
    
  ),
  
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'app.log',
    }),
  ],
});

export const logError = (error) => {
  logger.error({
    message: error.message,
    stack: error.stack, // Include the stack trace
  });
};

export default logger;
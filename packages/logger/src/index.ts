type LogMessage = string | number | object | Error;

export const logger = {
  log: (str: LogMessage) => console.log(`[LOG] ${str}`),
  error: (str: LogMessage) => console.error(`[ERROR] ${str}`),
  info: (str: LogMessage) => console.log(`[INFO] ${str}`)
};

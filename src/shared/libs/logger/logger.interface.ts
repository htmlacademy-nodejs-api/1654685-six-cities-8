export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  success(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(error: unknown, message?: string, ...args: unknown[]): void;
}

export interface IAppErrorOptions {
  statusCode?: number;
  messageCode?: number;
  extra?: unknown;
}

export interface IError extends Error {
  status?: unknown;
  statusCode?: unknown;
  messageCode?: unknown;
}

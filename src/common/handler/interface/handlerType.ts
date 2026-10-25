export interface IError extends Error {
  status?: unknown;
  statusCode?: unknown;
}

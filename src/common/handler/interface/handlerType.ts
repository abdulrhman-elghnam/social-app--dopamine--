export interface IError extends Error {
    status?: unknown;
    statusCode?: unknown;
}

export interface IHandlerFunction {
    handler: Function
}

class RequestError extends Error {
    status: number;

    constructor(msg: string, status: number) {
        super(msg);
        this.status = status;
        this.name = 'RequestError';

        if (Error.captureStackTrace) { Error.captureStackTrace(this, RequestError); }
    }
}

export default RequestError;

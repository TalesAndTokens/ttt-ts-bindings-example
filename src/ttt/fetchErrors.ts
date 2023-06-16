export class ResponseError extends Error {
  constructor(public message: string, public status: number, e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

export class NotFound extends ResponseError {}
export class InternalServerError extends ResponseError {}
export class BadGateway extends ResponseError {}
export class ServiceUnavailable extends ResponseError {}
export class UnknownError extends ResponseError {}

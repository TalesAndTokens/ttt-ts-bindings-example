import { UnknownError, NotFound, InternalServerError, BadGateway, ServiceUnavailable } from "./fetchErrors";

export const callGet = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-type": "application/json",
    },
  });

  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 404) {
    throw new NotFound("Not found", res.status);
  } else if (res.status === 500) {
    throw new InternalServerError("Internal Server Error", res.status);
  } else if (res.status === 502) {
    throw new BadGateway("Bad Gateway", res.status);
  } else if (res.status === 503) {
    throw new ServiceUnavailable("Service Unavailable", res.status);
  } else {
    throw new UnknownError(`Unknown Error`, res.status);
  }
};

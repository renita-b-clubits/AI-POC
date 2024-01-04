import { urlEncodedBody } from "./url-encoded-body";

export const urlEncodedRequestOptions = (
  details: Parameters<typeof urlEncodedBody>[0]
): RequestInit => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: urlEncodedBody(details),
  };
};

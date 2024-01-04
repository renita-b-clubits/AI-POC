import { Account } from "../../apis/mocks/account/data";
import { Response } from "../../apis/mocks/response";
import { urlEncodedRequestOptions } from "../../utils/url-encoded-request-options";

export type AccountLoginBody = {
  email: string;
  password: string;
};

export const accountLogin = async (
  body: AccountLoginBody
): Promise<Response<Account>> => {
  return await (
    await fetch("/account/login", urlEncodedRequestOptions(body))
  ).json();
};

import { Account } from "../../apis/mocks/account/data";
import { Response } from "../../apis/mocks/response";
import { urlEncodedRequestOptions } from "../../utils/url-encoded-request-options";

export type AccountLoginBody = {
  phone: string;
  otp: string;
};

export const accountLoginOtp = async (
  body: AccountLoginBody
): Promise<Response<{ status: boolean }>> => {
  return await (
    await fetch("/account/send/otp", urlEncodedRequestOptions(body))
  ).json();
};

export const accountLoginVerify = async (
  body: AccountLoginBody
): Promise<Response<Account>> => {
  return await (
    await fetch("/account/verify/otp", urlEncodedRequestOptions(body))
  ).json();
};

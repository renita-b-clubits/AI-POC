import {
  AccountSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
  generateAccountSASQueryParameters,
} from "@azure/storage-blob";
import { TRPCError } from "@trpc/server";
import envVariables from "../../../environment/variables";
import { getErrorMessage } from "../../../utils/get-error-message";
import { protectedProcedure } from "../../trpc";

const accountName = envVariables.AZURE_BLOB_ACCOUNT_NAME;

const accountKey = envVariables.AZURE_BLOB_STORAGE_KEY;

async function generateSasToken(): Promise<string> {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );

  const signature = generateAccountSASQueryParameters(
    {
      version: "2022-11-02",
      services: "bfqt",
      resourceTypes: "sco",
      permissions: AccountSASPermissions.parse("rwdlacupiytfx"),
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 11186400),
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential
  ).toString();

  return signature;
}

export const read = protectedProcedure.mutation(async () => {
  try {
    const sasToken = await generateSasToken();

    return { sasToken };
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: getErrorMessage(error),
    });
  }
});

import { TRPCError } from "@trpc/server";

export const getErrorMessage = (error: unknown): string => {
  if (error && error instanceof Error && "message" in error && error.message)
    return `${error instanceof TRPCError && "TRPCError: "}${error.message}`;

  return "Error message not found in the 'error' object.";
};

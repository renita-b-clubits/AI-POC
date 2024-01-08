import { trpc } from "../../trpc";
import { signIn } from "./sign-in";
import { signOut } from "./sign-out";
import { userMany } from "./users";
import { getMany } from "./get-many";
import { set } from "./set";
import { otp } from "./otp";
import { update } from "./update";
import { get } from "./get";
import { signInWithMobile } from "./sign-in-with-otp";
import { signInWithTwilio } from "./twilio-otp";

export const userRoutes = trpc.router({
  signIn,
  signOut,
  userMany,
  getMany,
  set,
  otp,
  update,
  get,
  signInWithMobile,
  signInWithTwilio,
});

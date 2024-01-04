import * as bcrypt from "bcrypt";
import envVariables from "../environment/variables";

export const hashSalt = (password: string) => {
  const salt = bcrypt.genSaltSync(envVariables.BCRYPT_SALT_ROUNDS || 10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

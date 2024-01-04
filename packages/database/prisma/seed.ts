import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { z } from "zod";
import type { UserOptionalDefaults } from "./generated/zod/modelSchema/UserSchema";
import type { RoleOptionalDefaults } from "./generated/zod/modelSchema/RoleSchema";
import type { UserStatusOptionalDefaults } from "./generated/zod/modelSchema/UserStatusSchema";

dotenv.config();

// const toBoolean = (secure: unknown) =>
//   String(secure).toLowerCase() === "true";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  BCRYPT_SALT_ROUNDS: z.preprocess(Number, z.number()),
});

// eslint-disable-next-line @typescript-eslint/no-namespace -- NA
export namespace NodeJS {
  export type ProcessEnv = z.infer<typeof envVariables>;
}

const env = envVariables.parse(process.env);

const hashSalt = (password: string): string => {
  const salt = bcrypt.genSaltSync(env.BCRYPT_SALT_ROUNDS || 10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});

const main = async (): Promise<void> => {
  return prisma.$transaction(
    async (tx) => {
      const defaultSelect = { id: true };
      const generateRole = (name: string): RoleOptionalDefaults => {
        return {
          name,
        };
      };

      const systemRole = generateRole("system");

      const { id: systemRoleId } = await tx.role.upsert({
        create: systemRole,
        update: systemRole,
        select: { ...defaultSelect },
        where: systemRole,
      });

      const systemUserName = "System";

      const systemUser: UserOptionalDefaults = {
        name: systemUserName,
        password: hashSalt(systemUserName.toLowerCase()),
        username: systemUserName.toLowerCase(),
        mobile: null,
        email: null,
        otp: null,
        expiryTime: null,
        twoFactor: false,
        roleId: systemRoleId,
        statusId: null,
        createdById: null,
        updatedById: null,
      };

      const { id: systemUserId } = await tx.user.upsert({
        create: systemUser,
        update: systemUser,
        where: {
          username: systemUser.username,
        },
        select: { ...defaultSelect },
      });

      const generateUserStatus = generateRole as (
        name: string
      ) => UserStatusOptionalDefaults;

      const [{ id: defaultUserStatusId }] = await Promise.all(
        [generateUserStatus("active"), generateUserStatus("inactive")].map(
          (userStatus) =>
            tx.userStatus.upsert({
              create: userStatus,
              update: userStatus,
              where: { name: userStatus.name },
              select: { ...defaultSelect },
            })
        )
      );

      const [{ id: adminRoleId }, { id: employeeRoleId }] = await Promise.all(
        [generateRole("admin"), generateRole("employee")].map((role) =>
          tx.role.upsert({
            create: role,
            update: role,
            where: {
              name: role.name,
            },
            select: { ...defaultSelect },
          })
        )
      );

      const generateAdminBySystem = (name: string): UserOptionalDefaults => {
        return {
          name,
          password: hashSalt(name.toLowerCase()),
          username: name.toLowerCase(),
          mobile: null,
          email: null,
          expiryTime: null,
          otp: null,
          twoFactor: false,
          roleId: adminRoleId,
          createdById: systemUserId,
          updatedById: systemUserId,
          statusId: defaultUserStatusId,
        };
      };

      const [{ id: balajiUserId }] = await Promise.all(
        [generateAdminBySystem("Balaji"), generateAdminBySystem("Sathish")].map(
          (user) =>
            tx.user.upsert({
              create: user,
              update: user,
              where: {
                username: user.username,
              },
              select: { ...defaultSelect },
            })
        )
      );

      const generateEmployeeBySuperAdmin = (
        name: string,
        mobile: string | null = null,
        email: string | null = null
      ): UserOptionalDefaults => {
        return {
          name,
          username: name.toLowerCase(),
          password: hashSalt(name.toLowerCase()),
          mobile,
          email,
          otp: null,
          expiryTime: null,
          twoFactor: false,
          roleId: employeeRoleId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
          statusId: defaultUserStatusId,
        };
      };

      await Promise.all(
        [
          generateEmployeeBySuperAdmin(
            "Mithunish",
            "9762123267",
            "mithunish.p@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin(
            "Murali",
            "6385374777",
            "muralidharan.t@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin(
            "Sakthi",
            "9677629948",
            "sakthi@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin(
            "Vignesh",
            "7904261582",
            "vignesh.s@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin(
            "Vishnupriya",
            "9894153639",
            "vishnu.e@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin(
            "Renita",
            "+918838047155",
            "renita.b@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin(
            "Yugesh",
            "+919677279963",
            "yugesh.mm@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin(
            "Ranjitha",
            "8608243165",
            "ranjitha.r@clubitssolutions.com"
          ),
          generateEmployeeBySuperAdmin("Daniel"),
          generateEmployeeBySuperAdmin("Naveen"),
        ].map((user) =>
          tx.user.upsert({
            create: user,
            update: user,
            where: {
              username: user.username,
            },
          })
        )
      );
    },
    { maxWait: 55000, timeout: 55000 }
  );
};

main()
  .catch(async (error) => {
    // eslint-disable-next-line no-console -- NA
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    // eslint-disable-next-line no-console -- NA
    prisma.$disconnect().then(console.log).catch(console.error);
  });

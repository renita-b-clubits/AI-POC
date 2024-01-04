import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterInput } from "../../router";
import { adminOnlyProcedure } from "../../trpc";

export const roles = ["admin", "employee"] as const;

export const insertUserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(3).max(20).optional(),
  mobile: z.string().min(10).optional(),
  email: z.string().min(5),
  roleId: z.number(),
});

export const hashSalt = (password: any) => {
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = RouterInput["user"]["set"];

export const set = adminOnlyProcedure
  .input(insertUserSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const hashedPassword = await hashSalt(input.password);

      const user = await prisma.$transaction(async (tx: any) => {
        const { id: activeStatusId } = await tx.userStatus.findUniqueOrThrow({
          select: { id: true },
          where: { name: "active" },
        });

        const user = await tx.user.create({
          data: {
            twoFactor: false,
            name: input.name,
            password: hashedPassword,
            username: input.username,
            mobile: input.mobile,
            email: input.email,
            roleId: input.roleId,
            statusId: activeStatusId,
          },

          select: {
            id: true,
            name: true,
            username: true,
            role: {
              select: {
                name: true,
              },
            },
            email: true,
            mobile: true,
          },
        });

        return user;
      });

      //       sendEmail({
      //         senderAddress,
      //         content: {
      //           subject: "Welcome to HRMS",
      //           plainText: `Welcome ${user.name}!

      // Following are the credentials for your account:
      // Username: ${user.username}
      // Password: ${input.password}

      // Regards,
      // Team HRMS
      // `,
      //         },
      //         recipients: {
      //           to: [
      //             {
      //               address: `<${user.email}>`,
      //               displayName: user.name,
      //             },
      //           ],
      //         },
      //       });

      return user;
    } catch (error) {
      console.error(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });

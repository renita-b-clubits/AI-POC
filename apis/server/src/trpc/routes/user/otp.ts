import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import env from "../../../environment/variables";
import { RouterOutput } from "../../router";
import { publicProcedure } from "../../trpc";

export type User = RouterOutput["user"]["otp"]["user"];

export const otp = publicProcedure
  .input(
    z.object({
      otp: z.string().min(6).optional(),
      username: z.string().min(3).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      let token: string | undefined = undefined; // Initialize to undefined
      console.log("userrrrrr otpp");
      const user = await prisma.user.findFirstOrThrow({
        select: {
          id: true,
          name: true,
          password: true,
          username: true,
          role: {
            select: {
              name: true,
            },
          },
          email: true,
          mobile: true,
          otp: true,
          expiryTime: true,
          twoFactor: true,
        },
        where: {
          username: input.username,
        },
      });
      console.log("rennn", user);

      console.log("enter the if condition");

      console.log(user.expiryTime?.getTime(), new Date().getTime());

      if (
        input.otp === user.otp &&
        user.expiryTime &&
        user.expiryTime.getTime() > new Date().getTime()
      ) {
        console.log("enter the if condition 2");

        token = await ctx.res.jwtSign(user);

        console.log(token);

        const refreshToken = await ctx.res.jwtSign(user, { expiresIn: "1d" });

        ctx.res.setCookie("refreshToken", refreshToken, {
          path: "/",
          secure: env.COOKIE_SECURE,
          httpOnly: env.COOKIE_HTTP_ONLY,
          sameSite: env.COOKIE_SAME_SITE,
        });
        return { user, token };
      }
      throw new TRPCError({ code: "UNAUTHORIZED" });
    } catch (error) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  });

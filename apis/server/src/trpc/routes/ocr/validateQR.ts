import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import env from "../../../environment/variables";
import { RouterOutput } from "../../router";
import { publicProcedure } from "../../trpc";

export type User = RouterOutput["user"]["otp"]["user"];

export const validateQR = publicProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      let token: string | undefined = undefined; // Initialize to undefined
      console.log("userrrrrr otpp");
      const qrDetails = await prisma.qrOcr.findFirstOrThrow({
        select: {
          id: true,
          qrId: true,
          expiryAt: true,
          isUploaded: true,
          userId: true,
        },
        where: {
          qrId: input.id,
          userId: input.userId,
        },
      });
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
          id: qrDetails.userId,
        },
      });
      console.log("rennn", user);

      console.log("enter the if condition");

      console.log(qrDetails.expiryAt?.getTime(), new Date().getTime());

      if (
        qrDetails.expiryAt &&
        qrDetails.expiryAt.getTime() > new Date().getTime() &&
        !qrDetails.isUploaded
      ) {
        console.log("enter the if condition 2");

        token = await ctx.res.jwtSign(user, {
          expiresIn: "5m",
        }); // 60 sec

        console.log(token);

        const refreshToken_ = await ctx.res.jwtSign(user, {
          expiresIn: "10m",
        }); //5min

        ctx.res.setCookie("refreshToken", refreshToken_, {
          path: "/",
          secure: env.COOKIE_SECURE,
          httpOnly: env.COOKIE_HTTP_ONLY,
          sameSite: env.COOKIE_SAME_SITE,
        });
        return { user, token };
      } else {
        console.log("expired............");
        throw new TRPCError({ code: "UNAUTHORIZED" });
        // throw new TRPCError({
        //   code: "FORBIDDEN",
        //   message: "Link expired or invalid link",
        //   cause: "Link expired or invalid link",
        // });
      }
      // throw new TRPCError({ code: "UNAUTHORIZED" });
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  });

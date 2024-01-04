import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { RouterOutput } from "../../router";
import { publicProcedure } from "../../trpc";
// import { sendEmail, senderAddress } from "../../../utils/send-email";
import env from "../../../environment/variables";

export type User = RouterOutput["user"]["signIn"]["user"];

const generateOTP = () => {
  const otpLength = 6;
  const otpChars = "0123456789";
  let otp = "";

  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * otpChars.length);
    otp += otpChars.charAt(randomIndex);
  }

  return otp;
};

export const signIn = publicProcedure
  .input(
    z.object({
      username: z.string().min(3),
      password: z.string().min(3).max(20),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
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
        where: { username: input.username },
      });

      if (user.twoFactor === true) {
        // Step 1: Generate OTP and Expiry Time
        const otp = generateOTP();

        const otpExpiry = new Date();

        otpExpiry.setSeconds(otpExpiry.getSeconds() + 90);

        // Step 2: Update OTP and Expiry Time in User Table
        const updateResult = await prisma.user.update({
          where: { username: input.username },
          data: {
            otp: otp,
            expiryTime: otpExpiry,
          },
        });

        if (!updateResult) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        // Step 3: Retrieve User from Database
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
          where: { username: input.username },
        });

        console.log(user);

        // Step 4: Check Password
        const isPasswordAMatch = bcrypt.compareSync(
          input.password,
          user.password
        );

        if (!isPasswordAMatch) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        // Remove sensitive information from user object
        delete (user as Partial<typeof user>).password;

        // Step 5: Send Email with OTP
        // await sendEmail({
        //   senderAddress,
        //   content: {
        //     subject: "Welcome to Maintenance System Login",
        //     html: `<html><head><style>
        //   // ... your email HTML ...
        //   </style></head><body><p> Following are the Login Otp  for your maintenance Login Page:</p>

        //   ${otp} And Your Expiry Time is ${otpExpiry}

        //   <p>Regards,<br>cluBITS</p>
        //   </body></html>`,
        //   },
        //   recipients: {
        //     to: [
        //       {
        //         address: `<${user.email}>`,
        //         displayName: `${user.name}`,
        //       },
        //     ],
        //   },
        // });

        return { user };
      } else {
        const isPasswordAMatch = bcrypt.compareSync(
          input.password,
          user.password
        );

        if (!isPasswordAMatch) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const token = await ctx.res.jwtSign(user);

        const refreshToken = await ctx.res.jwtSign(user, { expiresIn: "1d" });

        ctx.res.setCookie("refreshToken", refreshToken, {
          path: "/",
          secure: env.COOKIE_SECURE,
          httpOnly: env.COOKIE_HTTP_ONLY,
          sameSite: env.COOKIE_SAME_SITE,
        });

        return { user, token };
      }
    } catch (error) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  });

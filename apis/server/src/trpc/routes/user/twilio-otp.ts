import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { RouterOutput } from "../../router";
import { publicProcedure } from "../../trpc";
import twilio from "twilio";

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

export const signInWithTwilio = publicProcedure
  .input(
    z.object({
      username: z.string().min(3),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const phonePattern = /^\+\d{1,3}\d{7,15}$/; // Matches country code followed by phone number
      // condition to check if the input is a valid mobile number
      if (phonePattern.test(input.username)) {
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
          where: { mobile: input.username },
        });

        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        // Step 1: Generate OTP and Expiry Time
        const otp = generateOTP();
        const otpExpiry = new Date();
        otpExpiry.setSeconds(otpExpiry.getSeconds() + 90);

        // Step 2: Update OTP and Expiry Time in User Table
        await prisma.user.update({
          where: { username: user.username },
          data: {
            otp: otp,
            expiryTime: otpExpiry,
          },
        });

        // Step 4: Retrieve User from Database
        const user_details = await prisma.user.findFirstOrThrow({
          select: {
            id: true,
            name: true,
            password: false,
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
          where: { mobile: input.username },
        });

        // Send OTP using Twilio
        const twilioClient = twilio(
          "AC2acf0939c1a79acd7cb48572c28223b7",
          "a94d3548eeb23a4169afbfc9805993b7"
        );
        const mobileNumber = user.mobile ?? undefined; // Nullish coalescing operator to handle null case

        if (mobileNumber) {
          await twilioClient.messages.create({
            body: `Welcome! your mobile verification code is: ${otp}`,
            to: mobileNumber,
            from: "+12055122421",
          });
        } else {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User's mobile number is null or undefined.",
          });
        }

        return { user_details };
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid mobile number format",
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: JSON.stringify(error),
      });
    }
  });

import { TRPCError } from "@trpc/server";
// import * as bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { RouterOutput } from "../../router";
import { publicProcedure } from "../../trpc";
import { SNSClient } from "@aws-sdk/client-sns";
import { PublishCommand } from "@aws-sdk/client-sns";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

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

export const signInWithMobile = publicProcedure
  .input(
    z.object({
      username: z.string().min(3),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      console.log("user", 1234567890);
      console.log(input, "innpuuttt");
      const phonePattern = /^\+\d{1,3}\d{7,15}$/; // Matches country code followed by phone number
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
      //condition to check mobile no or email
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
        console.log("user-otp", user);
        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        // Step 1: Generate OTP and Expiry Time
        const otp = generateOTP();

        const otpExpiry = new Date();

        otpExpiry.setSeconds(otpExpiry.getSeconds() + 90);

        // Step 2: Update OTP and Expiry Time in User Table
        const updateResult = await prisma.user.update({
          where: { username: user.username },
          data: {
            otp: otp,
            expiryTime: otpExpiry,
          },
        });

        console.log("Update Results :", updateResult);

        if (!updateResult) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

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

        console.log("userDetails:", user_details);
        //sending msg through AWS
        const snsClient = new SNSClient({
          region: "us-east-1",
          credentials: {
            accessKeyId: "AKIAQEG3VIRR57XYNI46",
            secretAccessKey: "CVGEqwvae47Un2wyd+sfwvxxkV5p0CnrXtQClexQ",
          },
        });

        const params = {
          Message: `Welcome! your mobile verification code is: ${otp}`,
          PhoneNumber: user.mobile ?? undefined,
        };

        const result = await snsClient.send(new PublishCommand(params));

        console.log("result is: ", result);

        return { user_details };
      } else if (emailPattern.test(input.username)) {
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
          where: { email: input.username },
        });
        console.log("user-otp", user);
        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        // Step 1: Generate OTP and Expiry Time
        const otp = generateOTP();

        const otpExpiry = new Date();

        otpExpiry.setSeconds(otpExpiry.getSeconds() + 90);

        // Step 2: Update OTP and Expiry Time in User Table
        const updateResult = await prisma.user.update({
          where: { username: user.username },
          data: {
            otp: otp,
            expiryTime: otpExpiry,
          },
        });

        console.log("Update Results :", updateResult);

        if (!updateResult) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }

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
          where: { email: input.username },
        });

        console.log("userDetails:", user_details);

        const sesClient = new SESClient({
          region: "us-east-1",
          credentials: {
            accessKeyId: "AKIAQEG3VIRRXBNXX34K",
            secretAccessKey: "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",
          },
        });

        const params = {
          Source: "yugesh.mm@clubitssolutions.com",
          Destination: {
            ToAddresses: [String(user.email)],
          },
          Message: {
            Body: {
              Html: {
                Data: `IT IS ${otp} WORKING!`,
              },
            },
            Subject: {
              Data: "Node + SES Example",
            },
          },
        };
        const result = await sesClient.send(new SendEmailCommand(params));
        console.log("result is: ", result);
        return { user_details };
      }
    } catch (error) {
      console.log("in catch block", JSON.stringify(error));
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: JSON.stringify(error),
      });
    }
  });

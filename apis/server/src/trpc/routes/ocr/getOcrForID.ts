import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { protectedProcedure } from "../../trpc";

export const getOcrForID = protectedProcedure
  .input(
    z.object({
      type: z.string(),
      userID: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      // function process(data: { Key: string; Value: string }) {}
      let finalist: any = [];
      const data = await prisma.ocr.findMany({
        select: {
          extractedData: true,
          uploadedData: true,
          id: true,
          userId: true,
          type: true,
        },
        where: {
          userId: input.userID, // loggedIn user
          type: input.type,
        },
      });
      if (data.length) {
        data.map((e) => {
          const jsonData = JSON.parse(e.extractedData);
          let temp: any = {
            extractedData: jsonData,
            image: e.uploadedData,
            name: "",
            passportno: "",
            nationality: "",
            issuedate: "",
            expirydate: "",
            dob: "",
            gender: "",
            mobile: "",
          };
          if (jsonData.length) {
            jsonData.forEach((element: any) => {
              if (e.type === "passport") {
                if (
                  element.Key.toLowerCase().replace(/ /g, "").includes("name")
                ) {
                  temp.name = element.Value;
                }

                if (
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("passportno") ||
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("passportnumber")
                ) {
                  temp.passportno = element.Value;
                }

                if (
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("nationality")
                ) {
                  temp.nationality = element.Value;
                }

                if (
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("dateofissue")
                ) {
                  temp.issuedate = element.Value;
                }

                if (
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("dateofexpiry")
                ) {
                  temp.expirydate = element.Value;
                }
              } else {
                if (
                  element.Key.toLowerCase().replace(/ /g, "").includes("name")
                ) {
                  temp.name = element.Value;
                }

                if (
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("birth") ||
                  element.Key.toLowerCase().replace(/ /g, "").includes("dob")
                ) {
                  temp.dob = element.Value;
                }
                if (
                  element.Key.toLowerCase().replace(/ /g, "").includes("sex") ||
                  element.Key.toLowerCase().replace(/ /g, "").includes("gender")
                ) {
                  temp.gender = element.Value;
                }

                if (
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("contact") ||
                  element.Key.toLowerCase().replace(/ /g, "").includes("mobile")
                ) {
                  temp.mobile = element.Value;
                }
                if (
                  element.Key.toLowerCase()
                    .replace(/ /g, "")
                    .includes("nationality")
                ) {
                  temp.nationality = element.Value;
                }
              }
            });
          }
          finalist.push(temp);
        });
      }
      return finalist;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: JSON.stringify(error),
      });
    }
  });

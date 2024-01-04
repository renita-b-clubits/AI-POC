import { TRPCError } from "@trpc/server";
import axios from "axios";
import { z } from "zod";
import envVariables from "../../../environment/variables";
import { protectedProcedure } from "../../trpc";

const computerVisionApiKey = envVariables.AZURE_COMPUTER_VISION_API_KEY;
const computerVisionEndpoint = envVariables.AZURE_COMPUTER_VISION_ENDPOINT;

interface ExtractedDetails {
  text: string;
}

async function OCR(url: string): Promise<ExtractedDetails[]> {
  const endpoint = `${computerVisionEndpoint}/vision/v3.1/ocr`;

  try {
    const response = await axios.post(
      endpoint,
      { url },
      {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": computerVisionApiKey,
        },
      }
    );

    console.log("Azure Computer Vision API Response:", response.data);

    const regions = response.data.regions;
    console.log(JSON.stringify(regions, null, 2));
    const extractedDetails: ExtractedDetails[] = [];

    // if (regions) {
    //   // let currentKey = "";

    //   regions.forEach((region: any) => {
    //     region.lines.forEach((line: any, index: number, lines: any[]) => {
    //       const words = line.words
    //         .map((word: any) => word.text)
    //         .join(" ")
    //         .trim();

    //       if (index < lines.length - 1) {
    //         const nextLineWords = lines[index + 1].words
    //           .map((word: any) => word.text)
    //           .join(" ")
    //           .trim();
    //         const value = extractedDetails[nextLineWords] || nextLineWords;
    //         console.log({ [words]: value });
    //         extractedDetails[words] = value;
    //       }
    //     });
    //   });
    // }

    if (regions) {
      regions.forEach((region: any) => {
        region.lines.forEach((line: any) => {
          const text = line.words
            .map((word: any) => word.text)
            .join(" ")
            .trim();
          extractedDetails.push({ text });
        });
      });
    }

    console.log("Extracted Details:", extractedDetails);

    return extractedDetails;
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw error;
  }
}
export const get = protectedProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    try {
      const extractedDetails = await OCR(input);

      // You can now display the extracted details in a key-value format
      console.log("Final Extracted Details:", extractedDetails);

      return { extractedDetails };
    } catch (error) {
      console.error("Error in OCR procedure:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });

import React, { useState } from "react";
// import axios from "axios";
import { uploadFileToBlob } from "../utils/azure-blob-upload";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";
import { useAuthContext } from "../shared/hooks/use-auth";
import { toast } from "react-toastify";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DocumentExtraction: React.FC = () => {
  const auth = useAuthContext();

  const [extractionInProgress, setExtractionInProgress] = React.useState(false);

  const [extractedDetailsData, setExtractedDetailsData] = useState<{
    [key: string]: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadLabel, setUploadLabel] = React.useState(
    "Choose Image / File to Upload"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onOCRFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const [file] = event.target.files;

    if (!file) return;
    setExtractionInProgress(true);

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    await OCR(file);
  };

  const OCR = async (file: File) => {
    try {
      const { sasToken } = await client.sasToken.read.mutate();
      const imageUrl = await uploadFileToBlob(file, sasToken);
      const ocrResult = await client.ocr.get.mutate(imageUrl);

      const extractedDetails = ocrResult.extractedDetails;

      console.log("Backend Extracted Details:", extractedDetails);

      // Convert the array of ExtractedDetails to a key-value pair where keys are indices
      const indexedDetails: { [key: string]: string } = {};
      extractedDetails.forEach((detail, index) => {
        indexedDetails[index.toString()] = detail.text;
      });

      setExtractedDetailsData(indexedDetails);
      setError(null);
      setUploadLabel("Extraction Completed");
    } catch (error) {
      console.error("Error during OCR:", error);
      toast.error("An error occurred.");
      handleTRPCError(error, auth);
    } finally {
      setExtractionInProgress(false);
    }
  };

  return (
    <>
      <div>
        <label
          style={{
            height: 320,
            width: "auto",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          className="form-control"
          htmlFor="ocrImageFile"
        >
          {extractionInProgress ? "Extraction in Progress..." : uploadLabel}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: "500px", // Set the specific width
                marginLeft: "10px",
                height: "300px",
                marginTop: "1rem", // Set the specific height
              }}
            />
          )}
        </label>
        <input
          type="file"
          style={{
            display: "none",
          }}
          className="form-control"
          id="ocrImageFile"
          onChange={onOCRFileChange}
        />

        {/* {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%" }}
          />
        )} */}

        {error && <div style={{ color: "red" }}>{error}</div>}

        {extractedDetailsData && (
          <div>
            <h2>Extracted Details:</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(extractedDetailsData).map(
                    ([key, value], index) => (
                      <TableRow
                        key={key}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#f0f0f0",
                          height: "-10px",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {key}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentExtraction;

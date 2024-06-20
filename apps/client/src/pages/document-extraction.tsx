import React, { useState } from "react";
// import axios from "axios";
import { uploadFileToBlob } from "../utils/azure-blob-upload";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";
import { useAuthContext } from "../shared/hooks/use-auth";
import { toast } from "react-toastify";

const DocumentExtraction: React.FC = () => {
  const auth = useAuthContext();

  const [error] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onOCRFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const [file] = event.target.files;

    if (!file) return;

    // const imageUrl = URL.createObjectURL(file);
    // setSelectedImage(imageUrl);

    await OCR(file);
  };

  const OCR = async (file: File) => {
    try {
      const { sasToken } = await client.sasToken.read.mutate();
      const imageUrl = await uploadFileToBlob(file, sasToken);
      setSelectedImage(imageUrl);
    } catch (error) {
      console.error("Error during OCR:", error);
      toast.error("An error occurred.");
      handleTRPCError(error, auth);
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
          {selectedImage ? "Image Uploaded!" : "Choose Image / File to Upload"}
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
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </>
  );
};

export default DocumentExtraction;

// import * as React from 'react';

import { Box } from "@mui/material";

import { useState } from "react";
import { uploadFileToBlob } from "../utils/azure-blob-upload";
import { client } from "../main";
import React from "react";

export default function MultiActionAreaCard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedBlobImage, setSelectedBlobImage] = useState<string | null>(
    null
  );

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const [file] = event.target.files;
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { sasToken } = await client.sasToken.read.mutate();
      const imageUrl = await uploadFileToBlob(file, sasToken);
      setSelectedBlobImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="vstack"
      style={{
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "100%", typography: "body1", textAlign: "center" }}>
        <div className="hstack gap-5" style={{ justifyContent: "center" }}>
          <input
            type="file"
            id="passportFileInput"
            style={{ marginLeft: "33px", width: "300px" }}
            className="form-control"
            onChange={(e) => {
              onFileChange(e);
            }}
          />
        </div>
        <div
          className="hstack"
          style={{
            backgroundColor: "white",
            marginTop: "12px",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {selectedImage && (
              <div>
                <div>Local Storage</div>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{
                    width: "500px",
                    height: "300px",
                    marginTop: "1rem",
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ textAlign: "center", marginLeft: "100px" }}>
            {selectedBlobImage && (
              <div>
                <div>Blob Storage</div>
                <img
                  src={selectedBlobImage}
                  alt="Selected"
                  style={{
                    width: "500px",
                    height: "300px",
                    marginTop: "1rem",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

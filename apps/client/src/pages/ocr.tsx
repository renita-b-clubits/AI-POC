// import * as React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CardActions,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Tab,
  Box,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import axios from "axios";
import { uploadFileToBlob } from "../utils/azure-blob-upload";
import { client } from "../main";
import { useAuthContext } from "../shared/hooks/use-auth";
import React from "react";
import ViewDetails from "./view_ocr";

interface DataItem {
  Key: string;
  Value: string;
}

export default function MultiActionAreaCard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [res, setResponse] = useState({
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const auth = useAuthContext();
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setResponse({
      data: [],
    });
    if (key === "health") {
      const inputElement1 = document.getElementById(
        "passportFileInput"
      ) as HTMLInputElement;
      if (inputElement1) {
        inputElement1.value = ""; // Clear the input value
      }
    } else {
      const inputElement2 = document.getElementById(
        "healthFileInput"
      ) as HTMLInputElement;
      if (inputElement2) {
        inputElement2.value = ""; // Clear the input value
      }
    }

    if (!event.target.files) return;

    const [file] = event.target.files;
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    const resp = await axios.post("http://localhost:5000", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    setResponse(resp);

    try {
      const { sasToken } = await client.sasToken.read.mutate();
      const imageUrl = await uploadFileToBlob(file, sasToken);
      const save_response = await client.ocr.upload.mutate({
        extractedData: JSON.stringify(resp.data),
        uploadedData: imageUrl,
        type: key,
        userID: auth.state.user.id,
      });
      console.log("save", save_response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vstack">
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Upload Document" value="1" />
                <Tab label="View Document" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="hstack gap-5">
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/images/passport_cartoon.jpg"
                      alt="Upload Passport"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ marginLeft: "65px", fontWeight: "bold" }}
                      >
                        Upload Passport
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload your passport as image or pdf, To extract the
                        details.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <input
                      type="file"
                      style={{ marginLeft: "33px" }} // Hide the input element visually
                      id="passportFileInput" // Give it an ID for easier reference
                      className="form-control"
                      onChange={(e) => {
                        onFileChange(e, "passport");
                      }}
                    />
                  </CardActions>
                </Card>

                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/images/medical-insurance.png"
                      alt="Upload Health card"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ marginLeft: "55px", fontWeight: "bold" }}
                      >
                        Upload Health Card
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload your Health card as image or pdf, To extract the
                        details.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <input
                      type="file"
                      style={{ marginLeft: "33px" }} // Hide the input element visually
                      id="healthFileInput" // Give it an ID for easier reference
                      className="form-control"
                      onChange={(e) => {
                        onFileChange(e, "health");
                      }}
                    />
                  </CardActions>
                </Card>
              </div>
              <div
                className="hstack"
                style={{ backgroundColor: "white", marginTop: "12px" }}
              >
                <div>
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
                </div>
                <div>
                  <ul>{!loading ? res.data?.length > 0 : "Loading...."}</ul>
                </div>
              </div>
              <div>
                {res.data?.length > 0 && (
                  <div>
                    <h2> Details:</h2>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <strong>Key</strong>
                            </TableCell>
                            <TableCell>
                              <strong>Value</strong>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {res.data.map((item: DataItem, index) => (
                            <TableRow
                              key={item.Key}
                              style={{
                                backgroundColor:
                                  index % 2 === 0 ? "#ffffff" : "#f0f0f0",
                                height: "-10px",
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {item.Key}
                              </TableCell>
                              <TableCell>{item.Value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <ViewDetails />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

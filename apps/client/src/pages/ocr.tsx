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
  Button,
  Modal,
  Grid,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { uploadFileToBlob } from "../utils/azure-blob-upload";
import { client } from "../main";
import { useAuthContext } from "../shared/hooks/use-auth";
import React from "react";
import ViewDetails from "./view_ocr";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";

interface DataItem {
  Key: string;
  Value: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QrModal(props: {
  open: { type: string; status: boolean };
  qrLink: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClose: any;
  userId: number;
}) {
  const { open, qrLink, handleClose, userId } = props;
  const [qrLinkNew, setLink] = useState("");
  const isMounted = useRef(true);

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const qrID = async () => {
      const uniqueId = uuidv4();
      // insert uniqueid, expirytime to  qrOcr table
      const res = await client.ocr.createQrID.mutate({
        id: uniqueId,
        userId: userId,
      });
      console.log("res:", res);
      const payload = {
        type: open?.type ?? "",
        id: uniqueId,
        userId: userId,
      };
      const encodedPayload = btoa(JSON.stringify(payload)); // base64
      console.log(payload, encodedPayload);
      const url = qrLink + "/?meta=" + encodedPayload;
      setLink(url);
      console.log(url);
    };
    if (isMounted.current) {
      qrID();
    }
    return () => {
      console.log("returned..................");
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      open={open?.status}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid style={{ fontWeight: "bold", fontSize: "20px" }}>
          Scan here to Upload Document
        </Grid>
        <Grid>Catogery:- {open.type}</Grid>

        <QRCode
          size={256}
          style={{ marginTop: "50px" }}
          value={qrLinkNew}
          viewBox={`0 0 256 256`}
        />
      </Box>
    </Modal>
  );
}

export default function MultiActionAreaCard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [res, setResponse] = useState({
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const auth = useAuthContext();
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState({
    status: false,
    type: "",
  });
  const qrLink =
    "https://337c-2405-201-e02e-711a-a06c-1273-36b1-315d.ngrok-free.app/scan-upload";

  const handleClose = () => {
    setOpen({
      status: false,
      type: "",
    });
  };

  const handleFileNameChange = (key: string) => {
    const passportCard = document.getElementById(
      "passportFileInput"
    ) as HTMLInputElement;
    const healthCard = document.getElementById(
      "healthFileInput"
    ) as HTMLInputElement;
    const otherDocument = document.getElementById(
      "otherFileInput"
    ) as HTMLInputElement;

    if (key === "health") {
      if (passportCard) {
        passportCard.value = ""; // Clear the input value
      }
      if (otherDocument) {
        otherDocument.value = "";
      }
    } else if (key === "passport") {
      if (healthCard) {
        healthCard.value = ""; // Clear the input value
      }
      if (otherDocument) {
        otherDocument.value = "";
      }
    } else if (key === "other") {
      if (passportCard) {
        passportCard.value = "";
      }
      if (healthCard) {
        healthCard.value = "";
      }
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDocumentType = async (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
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
    console.log("python api", resp);
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

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setResponse({
      data: [],
    });
    handleFileNameChange(key);
    handleDocumentType(event, key);
  };
  const generateQr = (type: string) => {
    setOpen({
      status: true,
      type: type,
    });

    return;
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
                    <div className="vstack">
                      <input
                        type="file"
                        id="passportFileInput" // Give it an ID for easier reference
                        className="form-control"
                        onChange={(e) => {
                          onFileChange(e, "passport");
                        }}
                      />
                      <div style={{ textAlign: "center" }}>~Or~</div>
                      <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          generateQr("passport");
                        }}
                      >
                        Generate QR
                      </Button>
                    </div>
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
                    <div className="vstack">
                      <input
                        type="file"
                        // style={{ marginLeft: "33px" }} // Hide the input element visually
                        id="healthFileInput" // Give it an ID for easier reference
                        className="form-control"
                        onChange={(e) => {
                          onFileChange(e, "health");
                        }}
                      />
                      <div style={{ textAlign: "center" }}>~Or~</div>
                      <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          generateQr("health");
                        }}
                      >
                        Generate QR
                      </Button>
                    </div>
                  </CardActions>
                </Card>

                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/images/upload_image.jpg"
                      alt="Upload Document"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ marginLeft: "55px", fontWeight: "bold" }}
                      >
                        Upload Document
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload your Document here, To extract the details.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <div className="vstack">
                      <input
                        type="file"
                        // style={{ marginLeft: "33px" }} // Hide the input element visually
                        id="otherFileInput" // Give it an ID for easier reference
                        className="form-control"
                        onChange={(e) => {
                          onFileChange(e, "other");
                        }}
                      />
                      <div style={{ textAlign: "center" }}>~Or~</div>
                      <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          generateQr("other");
                        }}
                      >
                        Generate QR
                      </Button>
                    </div>
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
                  <ul>{!loading ? <></> : "Loading...."}</ul>
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

      {open?.status ? (
        <QrModal
          open={open}
          handleClose={handleClose}
          qrLink={qrLink}
          userId={auth.state.user.id}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

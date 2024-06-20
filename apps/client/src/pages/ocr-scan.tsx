import {
  // Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { client, setToken } from "../main";
// import { useAuthContext } from "../shared/hooks/use-auth";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLocation } from "react-router-dom";
import { uploadFileToBlob } from "../utils/azure-blob-upload";
const LoadingText: React.FC = () => {
  return (
    <div className="loading-text">
      Please wait while we are extracting data......
    </div>
  );
};
export default function QrScanPage() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(true);

  const [display, setDisplay] = useState<boolean>(true);
  const isMounted = useRef(true);
  const size = useRef(0);
  const [res, setResponse] = useState({
    data: [],
  });
  interface DataItem {
    Key: string;
    Value: string;
  }
  // const auth = useAuthContext();

  const location = useLocation();
  const [val, setVal] = useState({
    type: "",
    id: "",
    userId: 0,
  });
  console.log(location);
  useEffect(() => {
    const load = async () => {
      let queryParam = location.search;
      queryParam = queryParam.replace("?meta=", "");
      // console.log("queryParam", queryParam);
      queryParam = atob(queryParam);
      console.log("queryParam", queryParam);
      const value = JSON.parse(queryParam);
      const resp = await client.ocr.validateQR.mutate({
        id: value.id,
        userId: value.userId,
      });
      console.log("resp", resp);
      setExpired(false);
      setToken(resp.token); // set token
      setVal(value);
      console.log("queryParam", value);
      setLoading(false);
    };

    if (isMounted.current) {
      try {
        load();
      } catch (e) {
        return;
      }
    }

    return () => {
      console.log("returned useeffect....");
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("expired", expired);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files as FileList;
    size.current = file?.size / 1000000;
    console.log("file", file);
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const formData = new FormData();
    formData.append("image", file);
    const resp = await axios.post(
      "https://bg0pmxlw-5000.inc1.devtunnels.ms/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // setToken(token);
    try {
      const { sasToken } = await client.sasToken.read.mutate();
      const imageUrl = await uploadFileToBlob(file, sasToken);
      console.log("data upload api....");
      const save_response = await client.ocr.upload.mutate({
        extractedData: JSON.stringify(resp.data),
        uploadedData: imageUrl,
        type: val.type,
        userID: val.userId,
        id: val.id,
      });
      console.log("data upload api....called");
      setResponse(resp);
      setDisplay(false);
      console.log(res, "resss");
      setToken("");
      console.log("save", save_response);
      toast.success("Uploaded sucessfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        className: "toast-message",
      });
    } catch (error) {
      toast.error("Failed to upload please retry", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        className: "toast-message",
      });
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        className="vstack bg-primary"
        style={{ height: "100%", overflow: "scroll" }}
      >
        {!expired ? (
          loading ? (
            <>Loading.....</>
          ) : (
            <div style={{ margin: "3.5rem" }}>
              {display ? (
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="220"
                      image="/images/upload_file.svg"
                      alt="Upload Document"
                      style={{ marginLeft: "1rem" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ marginLeft: "40px", fontWeight: "bold" }}
                      >
                        Upload Document
                      </Typography>
                      <Typography variant="h6" color="black">
                        Category: {val.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        User Id: {val.userId}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Id: {val.id}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <div className="vstack">
                      <input
                        type="file"
                        accept="image/*"
                        capture={true}
                        onChange={async (e) => {
                          console.log(e, "onchangeeee");
                          handleUpload(e);
                        }}
                      />
                    </div>
                  </CardActions>
                </Card>
              ) : (
                ""
              )}
              {image ? (
                <>
                  <img
                    src={image}
                    id="image"
                    alt="Selected"
                    style={{
                      width: "250px",
                      height: "auto",
                      marginTop: "1rem",
                    }}
                  />
                  <div>size:- {size.current} mb</div>
                </>
              ) : (
                <></>
              )}
              {image && !res.data.length ? (
                <>
                  <LoadingText />
                </>
              ) : (
                <></>
              )}
              <div style={{ marginTop: "1rem" }}>
                {res.data.length > 0 && (
                  <div>
                    <p>Extracted Details:</p>
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
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          "The link has expired or it is incorrect.Please regenerate the QR is the issue still persists"
        )}
      </div>
    </>
  );
}

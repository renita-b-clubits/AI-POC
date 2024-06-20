import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";

export const AnomalyDetection = () => {
  const [file, setFile] = useState<File>();
  const [response, setResponse] = useState<[]>([]);
  console.log(response, "response");

  const handleAnomalyDetection = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const resp = await axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setResponse(resp.data?.anomaly_rows || []);
    console.log(resp.data.anomaly_rows, "respppp");
  };
  const handleChange = async (file: File) => {
    setFile(file);
    console.log(file, "fileeeee");
    handleAnomalyDetection(file);
  };

  return (
    <div className="vstack gap-5">
      <Box>
        <div className="hstack gap-5">
          <Card style={{ width: "100%" }}>
            <CardActionArea>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ margin: "1rem", fontWeight: "bold" }}
              >
                Anomaly Detection
              </Typography>
              <CardMedia
                component="img"
                height="300"
                style={{ objectFit: "none" }}
                image="/images/anomaly_detection.svg"
                alt="Upload Passport"
              />
              <CardContent></CardContent>
            </CardActionArea>
            <CardActions>
              <div className="vstack">
                <div style={{ margin: "auto" }}>
                  <FileUploader handleChange={handleChange} name="file" />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: "7px",
                  }}
                >
                  {file ? `File name: ${file.name}` : "no files uploaded yet"}
                </div>
              </div>
            </CardActions>
          </Card>
        </div>
      </Box>
      <div>
        {response.length > 0 && (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Employee Id</TableCell>
                  {/* <TableCell align="center">Anomaly Score</TableCell> */}
                  <TableCell align="center">Month</TableCell>
                  <TableCell align="center">Year</TableCell>
                  <TableCell align="center">Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {response.map((element) => {
                  return (
                    <TableRow
                      key={1}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        {element["Employee Id"]}
                      </TableCell>
                      {/* <TableCell align="center">
                        {element["Anomaly_Score"]}
                      </TableCell> */}
                      <TableCell align="center">{element["Month"]}</TableCell>
                      <TableCell align="center">{element["Year"]}</TableCell>
                      <TableCell align="center">{element["Salary"]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default AnomalyDetection;

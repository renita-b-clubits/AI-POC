// import * as React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard() {
  return (
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
              Upload your passport as image or pdf, To extract the details.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <input
            type="file"
            style={{ marginLeft: "33px" }} // Hide the input element visually
            id="fileInput" // Give it an ID for easier reference
            // onChange={(e) => handleFileUpload(e.target.files)}
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
              style={{ marginLeft: "65px", fontWeight: "bold" }}
            >
              Upload Health Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload your Health card as image or pdf, To extract the details.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <input
            type="file"
            style={{ marginLeft: "33px" }} // Hide the input element visually
            id="fileInput" // Give it an ID for easier reference
            // onChange={(e) => handleFileUpload(e.target.files)}
          />
        </CardActions>
      </Card>
    </div>
  );
}

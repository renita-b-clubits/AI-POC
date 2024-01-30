import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { client } from "../main";
import { useAuthContext } from "../shared/hooks/use-auth";
import Modal from "@mui/material/Modal";

interface DataItem {
  name: string;
  passportno: string;
  nationality: string;
  issuedate: string;
  expirydate: string;
  uploadedData: string;
  dob: string;
  gender: string;
  mobile: string;
  image: string;
}

function PassportTable(props: { rows: [] }) {
  const { rows } = props;
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
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
  const handleOpen = (image: string) => {
    setOpen(true);
    setImage(image);
  };
  const handleClose = () => {
    setOpen(false);
    setImage("");
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Passport Number</TableCell>
              <TableCell align="right">Nationality</TableCell>
              <TableCell align="right">Issue Date</TableCell>
              <TableCell align="right">Expiry Date</TableCell>
              <TableCell align="right">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: DataItem) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.passportno}</TableCell>
                <TableCell align="right">{row.nationality}</TableCell>
                <TableCell align="right">{row.issuedate}</TableCell>
                <TableCell align="right">{row.expirydate}</TableCell>
                <TableCell align="right">
                  <ImageIcon
                    onClick={() => {
                      handleOpen(row.image);
                    }}
                  ></ImageIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <>
        {/* <ImageModal open={open} handleClose={handleClose} image={image} /> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="img" sx={style} src={image} />
        </Modal>
      </>
    </>
  );
}

function CommonTable(props: { rows: [] }) {
  const { rows } = props;
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
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
  const handleOpen = (image: string) => {
    setOpen(true);
    setImage(image);
  };
  const handleClose = () => {
    setOpen(false);
    setImage("");
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">date of Birth</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">contact</TableCell>
              <TableCell align="right">Nationality</TableCell>
              <TableCell align="right">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: DataItem) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.dob}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.mobile}</TableCell>

                <TableCell align="right">{row.nationality}</TableCell>
                <TableCell align="right">
                  <ImageIcon
                    onClick={() => {
                      handleOpen(row.image);
                    }}
                  ></ImageIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <>
        {/* <ImageModal open={open} handleClose={handleClose} image={image} /> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="img" sx={style} src={image} />
        </Modal>
      </>
    </>
  );
}

export default function ViewDetails() {
  const [loading, setLoading] = useState(false);
  const auth = useAuthContext();
  const [data, setData] = useState<[]>([]);
  const [category, setCategory] = useState("passport");
  console.log("data:", data);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await client.ocr.getOcrForID.mutate({
        userID: auth.state.user.id,
        type: category,
      });
      setData(response);
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="vstack">
      <div style={{ width: "26rem" }}>
        <Box>
          <FormControl className="w-50">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e: SelectChangeEvent) => {
                const val = e.target.value as string;
                setCategory(val);
              }}
            >
              <MenuItem value={"passport"}>Passport</MenuItem>
              <MenuItem value={"health"}>Health Card</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div style={{ marginTop: "2rem" }}>
        {loading ? (
          "Loading...."
        ) : (
          <>
            {category === "passport" ? (
              <PassportTable rows={data} />
            ) : (
              <CommonTable rows={data} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Average from "./Operations/Average";
import Min from "./Operations/Min";
import Max from "./Operations/Max";
import Sort from "./Operations/Sort";
const InformationModal = ({ open, handleClose, socket, handleAddStudent }) => {
  const [operation, setOperation] = React.useState("");
  const [avgRes, setAvgRes] = React.useState([]);
  const [minRes, setMinRes] = React.useState([]);
  const [maxRes, setMaxRes] = React.useState([]);
  const [sortRes, setSortRes] = React.useState([]);
  const [clickButton, setClickButton] = React.useState(false);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          setOperation("");
          setAvgRes([]);
          setMinRes([]);
          setMaxRes([]);
          setSortRes([]);
          setClickButton(false);
        }}
        sx={{ ".MuiDialog-paper": { minWidth: 800 } }}
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: 50,
            alignItems: "center",
            boxShadow: "1px 0.2px gray",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Get Students Information</p>
          <Button onClick={handleAddStudent}>Add Student</Button>
        </DialogTitle>
        <DialogContent style={{ minHeight: 100 }}>
          <DialogContentText style={{ marginTop: 20 }}>
            Please Choose One of the following options
          </DialogContentText>
          <Stack
            direction="row"
            spacing={1}
            style={{ marginTop: 10, justifyContent: "center" }}
          >
            <Button
              children="Average"
              variant={operation === "Average" ? "contained" : "outlined"}
              onClick={() => {
                setOperation("Average");
                setClickButton(false);
              }}
            />
            <Button
              children="Sort"
              variant={operation === "Sort" ? "contained" : "outlined"}
              onClick={() => {
                setOperation("Sort");
                setClickButton(false);
              }}
            />
            <Button
              children="Max"
              variant={operation === "Max" ? "contained" : "outlined"}
              onClick={() => {
                setOperation("Max");
                setClickButton(false);
              }}
            />
            <Button
              children="Min"
              variant={operation === "Min" ? "contained" : "outlined"}
              onClick={() => {
                setOperation("Min");
                setClickButton(false);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            disabled={!operation}
            onClick={() => {
              setClickButton(true);
              socket.emit(operation);
              socket.on(`${operation}-result`, (message) => {
                switch (operation) {
                  case "Average":
                    setAvgRes(message);
                    break;
                  case "Min":
                    setMinRes(message);
                    break;
                  case "Max":
                    setMaxRes(message);
                    break;
                  case "Sort":
                    setSortRes(message);
                    break;
                  default:
                    break;
                }
              });
            }}
          >
            Get Result
          </Button>
        </DialogActions>
        {!!operation && clickButton && (
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            {operation === "Average" ? (
              <Average students={avgRes} />
            ) : operation === "Min" ? (
              <Min students={minRes} />
            ) : operation === "Max" ? (
              <Max students={maxRes} />
            ) : operation === "Sort" ? (
              <Sort students={sortRes} />
            ) : null}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default InformationModal;

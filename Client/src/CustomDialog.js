import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ open, handleClose, handleSubmit }) {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ ".MuiDialog-paper": { minWidth: 500 } }}
      >
        <DialogTitle style={{ fontWeight: "bold" }}>Faculty Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter the name of your faculty
          </DialogContentText>
          <TextField
            style={{ marginTop: 25 }}
            autoFocus
            label="Faculty Name"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ width: 180 }}
            onClick={() => {
              handleSubmit(value);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

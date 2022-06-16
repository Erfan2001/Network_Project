import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const TeenagerModal = ({ socket, open, handleClose, handleSubmit }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [nationalCode, setNationalCode] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [courseName1, setCourseName1] = React.useState("");
  const [courseGrade1, setCourseGrade1] = React.useState("");
  const [courseName2, setCourseName2] = React.useState("");
  const [courseGrade2, setCourseGrade2] = React.useState("");
  const [courseName3, setCourseName3] = React.useState("");
  const [courseGrade3, setCourseGrade3] = React.useState("");
  const [courseName4, setCourseName4] = React.useState("");
  const [courseGrade4, setCourseGrade4] = React.useState("");
  const [courseName5, setCourseName5] = React.useState("");
  const [courseGrade5, setCourseGrade5] = React.useState("");
  const fileReader = new FileReader();
  const handleOnChange = (e) => {
    handleOnSubmit(e.target.files[0]);
  };
  const handleOnSubmit = (val) => {
    if (val) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        socket.emit("sendStudentsCSV", csvOutput);
      };
      fileReader.readAsText(val);
      handleClose();
      Swal.fire({
        title: "success",
        text: "Students Imported Successfully",
        icon: "success",
      });
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setFirstName("");
        setLastName("");
        setNationalCode("");
        setIdNumber("");
        setCourseName1("");
        setCourseGrade1("");
        setCourseName2("");
        setCourseGrade2("");
        setCourseName3("");
        setCourseGrade3("");
        setCourseName4("");
        setCourseGrade4("");
        setCourseName5("");
        setCourseGrade5("");
      }}
      sx={{
        ".MuiDialog-paper": { minWidth: 750 },
        "*::-webkit-scrollbar": {
          width: "0.5rem",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#A1A6B0",
          borderRadius: "20px",
        },
      }}
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
        <p style={{ fontWeight: "bold" }}>Add Student</p>
        <Button variant="contained" component="label">
          <input
            id="csvInput"
            name="file"
            type="File"
            hidden
            onChange={handleOnChange}
            accept={".csv"}
          />
          Import Students
        </Button>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginTop: 5 }}>
          Please Enter the details for teenager you want to add
        </DialogContentText>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 15 }}
        >
          <TextField
            style={{ marginTop: 25 }}
            label="First Name"
            autoFocus
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 15 }}
        >
          <TextField
            style={{ marginTop: 25 }}
            label="National Code"
            fullWidth
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Id Number"
            fullWidth
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: 0.2,
            background: "gray",
            marginTop: 20,
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ fontSize: 18, fontWeight: "bold" }}>Courses</p>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 15 }}
        >
          <TextField
            style={{ marginTop: 25 }}
            label="Course Name"
            fullWidth
            value={courseName1}
            onChange={(e) => setCourseName1(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Course Grade"
            fullWidth
            value={courseGrade1}
            onChange={(e) => setCourseGrade1(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 15 }}
        >
          <TextField
            style={{ marginTop: 25 }}
            label="Course Name"
            fullWidth
            value={courseName2}
            onChange={(e) => setCourseName2(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Course Grade"
            fullWidth
            value={courseGrade2}
            onChange={(e) => setCourseGrade2(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 15 }}
        >
          <TextField
            style={{ marginTop: 25 }}
            label="Course Name"
            fullWidth
            value={courseName3}
            onChange={(e) => setCourseName3(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Course Grade"
            fullWidth
            value={courseGrade3}
            onChange={(e) => setCourseGrade3(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 15 }}
        >
          <TextField
            style={{ marginTop: 25 }}
            label="Course Name"
            fullWidth
            value={courseName4}
            onChange={(e) => setCourseName4(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Course Grade"
            fullWidth
            value={courseGrade4}
            onChange={(e) => setCourseGrade4(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 15 }}
        >
          <TextField
            style={{ marginTop: 25 }}
            label="Course Name"
            fullWidth
            value={courseName5}
            onChange={(e) => setCourseName5(e.target.value)}
          />
          <TextField
            style={{ marginTop: 25 }}
            label="Course Grade"
            fullWidth
            value={courseGrade5}
            onChange={(e) => setCourseGrade5(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          style={{ paddingInline: 20, color: "red", minWidth: 150 }}
          onClose={() => {
            handleClose();
            setFirstName("");
            setLastName("");
            setNationalCode("");
            setIdNumber("");
            setCourseName1("");
            setCourseGrade1("");
            setCourseName2("");
            setCourseGrade2("");
            setCourseName3("");
            setCourseGrade3("");
            setCourseName4("");
            setCourseGrade4("");
            setCourseName5("");
            setCourseGrade5("");
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            paddingInline: 20,
            color: "green",
            minWidth: 150,
          }}
          sx={{
            "&:hover": {
              color: "green",
            },
            "&:disabled": {
              color: "#ddd !important",
            },
          }}
          disabled={
            !(
              firstName &&
              lastName &&
              nationalCode &&
              idNumber &&
              courseName1 &&
              courseGrade1 &&
              courseName2 &&
              courseGrade2 &&
              courseName3 &&
              courseGrade3 &&
              courseName4 &&
              courseGrade4 &&
              courseName5 &&
              courseGrade5
            )
          }
          onClick={() => {
            handleSubmit({
              first_name: firstName,
              last_name: lastName,
              national_code: nationalCode,
              id_number: idNumber,
              courses: [
                { course_name: courseName1, course_grade: courseGrade1 },
                {
                  course_name: courseName2,
                  course_grade: courseGrade2,
                },
                {
                  course_name: courseName3,
                  course_grade: courseGrade3,
                },
                {
                  course_name: courseName4,
                  course_grade: courseGrade4,
                },
                {
                  course_name: courseName5,
                  course_grade: courseGrade5,
                },
              ],
            });
            Swal.fire({
              title: "success",
              text: "Student Added Successfully",
              icon: "success",
            });
            setFirstName("");
            setLastName("");
            setNationalCode("");
            setIdNumber("");
            setCourseName1("");
            setCourseGrade1("");
            setCourseName2("");
            setCourseGrade2("");
            setCourseName3("");
            setCourseGrade3("");
            setCourseName4("");
            setCourseGrade4("");
            setCourseName5("");
            setCourseGrade5("");
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default TeenagerModal;

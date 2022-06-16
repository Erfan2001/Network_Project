import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ socket }) {
  const [students, setStudents] = React.useState([]);
  React.useEffect(() => {
    const messageListener = (deliveredStudents) => {
      setStudents(deliveredStudents);
      console.log(deliveredStudents)
    };
    socket && socket.on("students", messageListener);
    socket && socket.emit("getStudents");
    return () => {
      socket && socket.off("students", messageListener);
    };
  }, [socket]);
  return (
    <>
      {
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, zIndex: 999999999, background: "red" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">First name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">National Code</StyledTableCell>
                <StyledTableCell align="center">Id Number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students?.map((row) => (
                <StyledTableRow key={Math.random()}>
                  <StyledTableCell align="center">
                    {row.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.national_code}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.id_number}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}

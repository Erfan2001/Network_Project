import React, { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";
import "./App.css";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import { ParticlesContainer } from "./Graph";
import TeenagerModal from "./TeenagerModal";
import InformationModal from "./InformationModal";
import MessageIcon from "@mui/icons-material/Message";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function App() {
  const [socket, setSocket] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const [addTeenagerModalIsOpen, setAddTeenagerModalIsOpen] = useState(false);
  const [informationModalIsOpen, setInformationModalIsOpen] = useState(false);
  const [nameModalIsOpen, setNameModalIsOpen] = useState(false);
  useEffect(() => {
    const newSocket = io(`http://localhost:8080/`);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);
  React.useEffect(() => {
    setNameModalIsOpen(true);
  }, []);
  return (
    <div className="App">
      <ParticlesContainer />
      {!isHidden && (
        <div
          style={{
            width: 400,
            height: 400,
            background: "white",
            position: "fixed",
            bottom: 100,
            right: 10,
            borderRadius: 16,
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
            Chat Room
          </p>
          <div style={{ width: "100%", height: 0.5, background: "gray" }} />
          <div
            className="chat-container"
            style={{
              maxHeight: "75%",
              overflowY: "scroll",
            }}
          >
            <Messages socket={socket} />
            <MessageInput socket={socket} />
          </div>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 20,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          background: "skyblue",
          width: 60,
          height: 60,
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => setIsHidden((prev) => !prev)}
      >
        <MessageIcon
          style={{
            color: "white",
            marginTop: "28%",
            marginLeft: "5%",
            fontSize: 30,
          }}
        />
      </div>
      <header className="App-header">
        <h1 style={{ color: "skyblue", zIndex: 1 }}>Socket Programming</h1>
        <TeenagerModal
          open={addTeenagerModalIsOpen}
          handleClose={() => {
            setAddTeenagerModalIsOpen(false);
          }}
          handleSubmit={(data) => {
            socket.emit("sendStudents", data);
            setAddTeenagerModalIsOpen(false);
          }}
          socket={socket}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 200 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setAddTeenagerModalIsOpen(true);
            }}
          >
            Add Student
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setInformationModalIsOpen(true);
            }}
          >
            Get Information
          </Button>
        </div>
        <p
          style={{
            zIndex: 1,
            wordBreak: "break-all",
            maxWidth: 540,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Design and implementation of programs under the student information
          network
        </p>

        <div
          style={{
            marginTop: "auto",
            zIndex: 99999,
            fontSize: 18,
            marginBottom: 5,
          }}
        >
          <a
            href="https://www.linkedin.com/in/erfan-nourbakhsh-221540197/"
            style={{ color: "white", textDecoration: "none" }}
          >
            Created By Erfan Nourbakhsh | Spring-2022
          </a>
        </div>
        {socket ? (
          <>
            <InformationModal
              open={informationModalIsOpen}
              handleClose={() => {
                setInformationModalIsOpen(false);
              }}
              socket={socket}
              handleAddStudent={() => {
                setAddTeenagerModalIsOpen(true);
              }}
            />
            <CustomDialog
              open={nameModalIsOpen}
              handleSubmit={(data) => {
                socket.emit("sendFacultyName", data);
                setNameModalIsOpen(false);
              }}
            />
          </>
        ) : null}
      </header>
    </div>
  );
}

export default App;

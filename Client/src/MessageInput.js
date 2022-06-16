import React, { useState } from "react";
import "./MessageInput.css";
import Button from "@mui/material/Button";
const NewMessage = ({ socket }) => {
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    if (value) {
      socket.emit("message", value);
      setValue("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        width: 400,
        bottom: 100,
        background: "gray",
        paddingBlock: 3,
      }}
    >
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        style={{
          width: "93%",
          marginInline: 2,
          borderRadius: 6,
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          submitForm();
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default NewMessage;

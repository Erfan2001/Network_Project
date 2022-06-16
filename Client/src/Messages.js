import React, { useEffect, useState } from "react";
import "./Messages.css";

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages");

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div style={{ marginInline: 10 }}>
            <p
              style={{
                textAlign: "left",
                fontWeight: "bold",
                fontSize: 12,
                marginRight: 2,
                color: "blue",
              }}
            >
              {message.user} :
            </p>
            <div
              style={{
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                paddingBlock: 3,
                paddingInline: 3,
                marginTop: -5,
                boxShadow: "1px 1px 1px 1px #888888",
              }}
            >
              <p
                style={{ fontSize: 12, marginLeft: 2, wordBreak: "break-all" }}
              >
                {message.value}
              </p>
            </div>
            <p style={{ textAlign: "right", fontSize: 8, fontWeight: "bold" }}>
              {new Date(message.time).toLocaleTimeString()}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Messages;

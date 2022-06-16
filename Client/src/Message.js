import React from "react";

const Message = ({ isYou, name = "asdasd" }) => {
  return (
    <div
      style={{
        background: "white",
        width: "80%",
        borderTopLeftRadius: isYou ? 20 : 0,
        borderTopRightRadius: isYou ? 0 : 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // paddingBlock: 3,
        marginTop: 5,
        marginInline: 5,
        marginLeft: isYou ? "auto" : 5,
      }}
    >
      <p style={{ fontSize: 12, color: "blue", marginLeft: 2 }}>
        {isYou ? "Me" : name}
      </p>
    </div>
  );
};
export default Message;

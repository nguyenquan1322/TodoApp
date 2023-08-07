import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Loading = (props) => {
  const { blur = false, absolute = false } = props;
  return (
    <div
      style={{
        zIndex: 999,
        position: absolute ? "absolute" : "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: blur ? "rgba(54, 215, 183, 0.1)" : "white",
      }}
    >
      <SyncLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;

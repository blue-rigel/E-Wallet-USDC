import React from "react";

const DummyFace = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#000000",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "80%",
            margin: "10%",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "#ff0000",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "360px",
              backgroundColor: "#000000",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "60%",
                height: "300px",
                backgroundColor: "#ffffff",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#61dafb",
                  padding: "50px",
                }}
              >
                This feature will be implemented soon
              </span>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "#ff0000",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DummyFace;

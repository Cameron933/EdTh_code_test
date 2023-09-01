import React from "react";
import StudentTable from "./components/StudentTable";

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#2546ce", height: "100vh" }}>
      <div style={{ backgroundColor: "#17e07d", color: "white" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20%",
            fontSize: 30,
          }}
        >
          Welcome to the Education Horizons{" "}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "20%",
          fontSize: 20,
        }}
      >
        <StudentTable />
      </div>
    </div>
  );
};

export default App;

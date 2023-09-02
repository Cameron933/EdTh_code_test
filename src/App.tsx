import React from "react";
import StudentTable from "./components/StudentTable";

const App: React.FC = () => {
  return (
    <main style={{ backgroundColor: "#2546ce", height: "100vh" }}>
      <header style={{ backgroundColor: "#17e07d", color: "white" }}>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20%",
            fontSize: 30,
          }}
        >
          Welcome to the Education Horizons{" "}
        </h1>
      </header>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40%",
          fontSize: 20,
        }}
      >
        <StudentTable />
      </section>
    </main>
  );
};

export default App;

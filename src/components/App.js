import React from "react";
import Header from "./Header";
import Chart from "./Chart";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <div className="one"></div>
        <div className="two">
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default App;

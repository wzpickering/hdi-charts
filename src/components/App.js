import React from "react";
import Header from "./Header";
import Chart from "./Chart";
import CountrySelect from "./CountrySelect";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <div className="one">
          <CountrySelect />
        </div>
        <div className="two">
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default App;

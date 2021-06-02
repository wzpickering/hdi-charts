import React, {useState} from "react";
import Header from "./Header";
import Chart from "./Chart";
import CountrySelect from "./CountrySelect";

function App() {
const [countries, setCountries] = useState([]);

function addCountry(country){
  
  setCountries(prevVal => {
    return [...prevVal, country];
  });
}

  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <div className="one">
          <CountrySelect onAdd={addCountry}/>
        </div>
        <div className="two">
          <Chart countryCodes={countries}/>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Header from "./Header";
import Chart from "./Chart";
import CountrySelect from "./CountrySelect";
import Explainer from "./Explainer"
import Footer from "./Footer"

const TOTAL_SELECTABLE = 8;
function App() {
  const [countries, setCountries] = useState([]);

  const toggleCountry = (country) => {
    setCountries((prevVal) => {
      // console.log(prevVal);
      if (prevVal.indexOf(country) >= 0) {
        //If pass in a country that is already in array, then remove it
        return prevVal.filter((cty) => cty !== country);
      } else {
        // Add country to list if under the count
        if (prevVal.length >= TOTAL_SELECTABLE) {
          alert("Exceeded maximum selection")
          return prevVal;
        } else {
          return [...prevVal, country];
        }
      }
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <div className="one">
          <CountrySelect countries={countries} toggleCountry={toggleCountry} />
        </div>
        <div className="two">
          <Chart countryCodes={countries} />
        </div>
        <div className="three ">
        <Explainer/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;

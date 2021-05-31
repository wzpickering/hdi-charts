import React, { useState, useEffect, useCallback } from "react";
// import {
//   List,
//   AutoSizer,
//   CellMeasurer,
//   CellMeasurerCache,
// } from "react-virtualized";
import axios from "axios";
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function CountrySelect() {
  
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    const { data } = await axios.get(
      `https://secret-beach-58035.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019/structure=ciy`
    );
    setCountries(Object.entries(data.country_name)); //each entry is an array. [0] for countryCode, [1] for name.
    // console.log(data);
  };
  //ask Kris what's happening here

  useEffect(() => {
    getData();
  }, []);

  const countryNames = [];
  countries.forEach((country)=>{
    countryNames.push(country[1])
  })
  

  const Row = ({index, style})=>{
      const names = countryNames.filter((value) => {
        if (
          searchTerm === "" ||
          value.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          // console.log(value[1])
          return <div> value</div> ;
        } else {
          return "";
        }
      })|| {};
      
      return (
      <div style={style}>
      {names[index] && <input type="checkbox" />}
        <label>{names[index]}</label>
      </div>
      );
  }

  return (
    
    <div className="country-select">
    <input
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    <FixedSizeList
          height={400}
          width={400}
          itemSize={20}
          itemCount={countries.length}
        >
          {Row}
        </FixedSizeList>
      {/* <input
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {countries
        .filter((value) => {
          if (
            searchTerm === "" ||
            value[1].toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return value;
          } else {
            return "";
          }
        })
        .map((country) => {
          return (
            <div>
              <input type="checkbox" />
              <label>{country[1]}</label>
            </div>
          );
        })} */}
    </div>
  );
}

export default CountrySelect;
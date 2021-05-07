import React, { useState, useEffect } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import axios from "axios";

function CountrySelect() {
  // const [countries, setCountries]=useState([])

  //     const entries = ()=>{
  //   axios
  //     .get(
  //       "https://secret-beach-58035.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019/structure=ciy"
  //     )
  //     .then((res) => {
  //       console.log(Object.entries(res.data.country_name)[0][1]);//0 for afghanistan, 1 for its name
  //     });

  // }
  // useEffect(()=>{
  //     entries();
  // })

  //     return (
  //         <div>
  //         <h1>WHatsup</h1>

  //         </div>

  //     )
  const [countries, setCountries] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      `https://secret-beach-58035.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019/structure=ciy`
    );
    setCountries(Object.entries(data.country_name)); //each entry is an array. [0] for countryCode, [1] for name.
    console.log(data);
  };
  //ask Kris what's happening here

  useEffect(() => {
    getData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input
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
        })}
    </div>
  );
}

export default CountrySelect;

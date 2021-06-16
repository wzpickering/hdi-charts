import React, { useState, useEffect } from "react";
import axios from "axios";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function CountrySelect(props) {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [green, toggleGreen]= useState({style:})

  const getData = async () => {
    const { data } = await axios.get(
      `https://secret-beach-58035.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019/structure=ciy`
    );
    setCountries(Object.entries(data.country_name)); //each entry is an array. [0] for countryCode, [1] for name.
  };

  const onChangeHandler = (evt) => {
    const country = evt.target.id;
    props.toggleCountry(country);
  };

  useEffect(() => {
    getData();
  }, []);

  const Row = ({ index, style }) => {
    const names =
      countries.filter((value) => {
        if (
          searchTerm === "" ||
          value[1].toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          // console.log(value[1])
          return <div> {value[1]} </div>;
        } else {
          return "";
        }
      }) || {};

    return (
      <div style={style} className={index % 2 ? "listItemOdd" : "listItemEven"}>
        {names[index] && (
          <>
            <input
              className="check"
              id={names[index][0]}
              type="checkbox"
              checked={props.countries.indexOf(names[index][0]) > -1}
              onChange={onChangeHandler}
            />
            <label className="country-name"> {names[index][1]}</label>
          </>
        )}
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div className="country-select">
          <input
            className="search"
            size="33"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <List
            height={height}
            width={width-8}
            itemSize={20}
            itemCount={countries.length}
          >
            {Row}
          </List>
        </div>
      )}
    </AutoSizer>
  );
}

export default CountrySelect;

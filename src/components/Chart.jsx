import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Chart = (props) => {
  const [chartData, setChartData] = useState({});
  // const [year, setYear] = useState([]);
  // const [hdi, setHdi] = useState([]);
  let countryCodes = props.countryCodes;
  console.log(countryCodes);
  const colors = [
    "#5258fa",
    "#f23d49",
    "#51a13d",
    "#cad642",
    "#42d6bb",
    "#f0b930",
    "#d62fc5",
    "#1c2945",
  ];

  const chart = () => {
    let hdIndex = [];
    let year = [];

    if (countryCodes.length > 0) {
      axios
        .get(
          "https://secret-beach-58035.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019/structure=ciy"
        )
        .then((res) => {
          const datasets = [];
          countryCodes.forEach((cCode, index) => {
            const hdIndex = [];
            for (const dataObj of Object.entries(
              res.data.indicator_value[countryCodes[index]][137506]
            )) {
              hdIndex.push(dataObj[1]);
              year.push(parseInt(dataObj[0]));
              // console.log(dataObj);
            }
            datasets.push({
              label: cCode,
              data: hdIndex,
              backgroundColor: colors[index], //options.elements.line.borderColor,
              borderColor: colors[index],
              borderWidth: 4,
            });
          });

          // console.log(hdIndex, year);
          setChartData({
            labels: year,
            datasets,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setChartData({
        labels: year,
        datasets: [],
      });
    }
  };
  useEffect(() => {
    chart();
  }, [countryCodes]);
  const options = {
    elements: {
      line: {
        borderColor: "green",
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "HDI",
          font: {
            size: 20,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
          font: {
            size: 20,
            weight: "bold",
            // color: "blue"
          },
        },
        grid: {
          display: false,
        },
        type: "linear",
        ticks: {
          callback: function (value, index, values) {
            return value;
          },
        },
      },
    },
  };

  //   function addData(chart, label, data) {
  //     chart.data.datasets.forEach((dataset) => {
  //         dataset.data.push(data);
  //     });
  //     chart.update();
  // }

  return (
    <div>
      <h1>HDI Comparison</h1>
      <div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;

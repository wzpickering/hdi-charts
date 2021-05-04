import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Chart = ()=> {
  const [chartData, setChartData] = useState({});
  const [year, setYear] = useState([]);
  const [hdi, setHdi] = useState([]);

  const chart = () => {
    let hdIndex = [];
    let year = [];

    axios
      .get(
        "https://secret-beach-58035.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/country_code=AFG/indicator_id=137506/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019/structure=ciy"
      )
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.data) {
          hdIndex.push(parseInt(dataObj.value));
          year.push(parseInt(dataObj.year));
        }
        setChartData({
          labels: year,
          datasets: [
            {
              label: "HDI by year",
              data: hdIndex,
              backgroundColor: "brown",
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
      chart();     
  }, []);
  return (
      <div>
          <h1>HDI Comparison</h1>
          <div>
              <Line data={chartData} />
          </div>
      </div>
  )
}

export default Chart;

// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import axios from "axios";

// const Dankmemes = () => {
//   const [chartData, setChartData] = useState({});
//   const [employeeSalary, setEmployeeSalary] = useState([]);
//   const [employeeAge, setEmployeeAge] = useState([]);

//   const chart = () => {
//     let empSal = [];
//     let empAge = [];
//     axios
//       .get("https://secret-beach-58035.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/country_code=AFG/indicator_id=137506/year=1990,1995,2000,2005,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019")
//       .then(res => {
//         console.log(res);
//         for (const dataObj of res.data.data) {
//           empSal.push(parseInt(dataObj.employee_salary));
//           empAge.push(parseInt(dataObj.employee_age));
//         }
//         setChartData({
//           labels: empAge,
//           datasets: [
//             {
//               label: "level of thiccness",
//               data: empSal,
//               backgroundColor: ["rgba(75, 192, 192, 0.6)"],
//               borderWidth: 4
//             }
//           ]
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     console.log(empSal, empAge);
//   };

//   useEffect(() => {
//     chart();
//   }, []);
//   return (
//     <div className="App">
//       <h1>Dankmemes</h1>
//       <div>
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             title: { text: "THICCNESS SCALE", display: true },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     autoSkip: true,
//                     maxTicksLimit: 10,
//                     beginAtZero: true
//                   },
//                   gridLines: {
//                     display: false
//                   }
//                 }
//               ],
//               xAxes: [
//                 {
//                   gridLines: {
//                     display: false
//                   }
//                 }
//               ]
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dankmemes;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/reducers/CovidStat";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { selectCovidStat } from "../store/reducers/CovidStat";
import { getCovid19Stat } from "../services";

function Covid19() {
  const { date, regions } = useSelector(selectCovidStat);
  const [selectDate, setSelectDate] = useState(
    date || new Date().toISOString().slice(0, 10)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const saved = localStorage.getItem(selectDate);
      console.log(
        "🚀 ~ file: Covid19.js:29 ~ fetchData ~ selectDate:",
        selectDate
      );
      let data = null;
      if (!!saved) {
        data = { date: selectDate, regions: JSON.parse(saved) };
      } else {
        data = await getCovid19Stat(selectDate);
      }
      if (!!data) {
        dispatch(add(data));
        console.log("🚀 ~ file: Covid19.js:149 ~ fetchData ~ newData:", data);
      }
    }
    fetchData();
  }, [selectDate]);

  const mapPtName = (name) => {
    let ptCode = name;
    switch (name) {
      case "Alberta":
        ptCode = "AB";
        break;
      case "British Columbia":
        ptCode = "BC";
        break;
      case "Manitoba":
        ptCode = "MB";
        break;
      case "New Brunswick":
        ptCode = "NB";
        break;
      case "Newfoundland and Labrador":
        ptCode = "NL";
        break;
      case "Northwest Territories":
        ptCode = "NT";
        break;
      case "Nova Scotia":
        ptCode = "NS";
        break;
      case "Nunavut":
        ptCode = "NU";
        break;
      case "Ontario":
        ptCode = "ON";
        break;
      case "Prince Edward Island":
        ptCode = "PE";
        break;
      case "Quebec":
        ptCode = "QC";
        break;
      case "Saskatchewan":
        ptCode = "SK";
        break;
      case "Yukon":
        ptCode = "YT";
        break;
      default:
        break;
    }
    return ptCode;
  };

  // [
  //   {
  //     region: "Alberta",
  //     cases: 4000,
  //     deaths: 2400,
  //     hospitalizations: 2400,
  //   },
  //   {
  //     region: "Manitoba",
  //     cases: 3490,
  //     deaths: 4300,
  //     hospitalizations: 2100,
  //   },
  // ];
  const regionsToChartData = regions.map((row) => {
    return {
      name: mapPtName(row.region),
      cases: row.cases,
      deaths: row.deaths,
      hospitalizations: row.hospitalizations,
    };
  });

  const showChart = (data) => {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="cases"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="deaths" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="hospitalizations" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h3>
          Canadian COVID-19 dataset from the COVID-19 Canada Open Data Working
          Group
        </h3>
        <h5>(see https://api.opencovid.ca/)</h5>

        {!!regions ? (
          <>
            <h6>
              Last updated on {date} <br />
              <input
                type="date"
                className="form-control text-center"
                value={date}
                min="2020-01-01"
                max={new Date().toISOString().slice(0, 10)}
                onChange={(event) => setSelectDate(event.target.value)}
                style={{ width: "180px" }}
              />
            </h6>
            <div className="container">{showChart(regionsToChartData)}</div>

            <div className="container table-responsive">
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Region</th>
                    <th scope="col">Cases</th>
                    <th scope="col">Deaths</th>
                    <th scope="col">Hospitalizations</th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map((row, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{row.region}</td>
                        <td>{row.cases}</td>
                        <td>{row.deaths}</td>
                        <td>{row.hospitalizations}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="table-dark">
                    <td colSpan="2">CANADA (Total {regions.length})</td>
                    <td>
                      {regions.reduce(
                        (partialSum, region) => partialSum + region.cases,
                        0
                      )}
                    </td>
                    <td>
                      {regions.reduce(
                        (partialSum, a) => partialSum + a.deaths,
                        0
                      )}
                    </td>
                    <td>
                      {regions.reduce(
                        (partialSum, b) => partialSum + b.hospitalizations,
                        0
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        ) : (
          <h4>Failed to load data</h4>
        )}
      </div>
    </>
  );
}

export default Covid19;

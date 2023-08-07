import React, { useState, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
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

function Covid19() {
  const { can, regions } = useLoaderData();

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
  const data = regions.map((row) => {
    return {
      name: mapPtName(row.region),
      cases: row.cases,
      deaths: row.deaths,
      hospitalizations: row.hospitalizations,
    };
  });

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
    <div className="container py-4">
      <h3>
        New Canadian COVID-19 dataset from the COVID-19 Canada Open Data Working
        Group
      </h3>
      <h5>(see https://api.opencovid.ca/)</h5>

      {!!can || !!regions ? (
        <>
          <h6>Last updated on {can.date}</h6>
          <div className="container">
            <div className="d-flex justify-content-center align-items-center container-fluid">
              {showChart(data)}
            </div>
          </div>

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
                  <td>{can.cases}</td>
                  <td>{can.deaths}</td>
                  <td>{can.hospitalizations}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <h4>Failed to load data</h4>
      )}
    </div>
  );
}

export default Covid19;

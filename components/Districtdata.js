import React, { useState, useEffect } from "react";
import { distinfo } from "./dataManipulated";
import { IoTrendingUpOutline } from "react-icons/io5";
import { numberFormat } from "./numberformat";

const Districtdata = ({ stdata }) => {
  const [distlist, setlist] = useState([]);

  useEffect(() => {
    setlist(distinfo(stdata));
  }, []);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th className="dist">District</th>
            <th className="confirm">Confirmed</th>
            <th className="active">Active</th>
            <th className="recvr">Recovered</th>
            <th className="death">Deceased</th>
            <th className="vaccine">Vaccinated</th>
            <th className="tested">Tested</th>
            <th className="popu">Population</th>
          </tr>
        </thead>
        <tbody>
          {distlist.map((dist) => {
            return (
              <tr key={dist.district}>
                <td className="dist">{dist.district}</td>
                <td className="confirm">
                  {numberFormat(dist.confirmed)}
                  &nbsp;
                  {dist.delta != undefined &&
                    dist.delta.confirmed != undefined &&
                    dist.delta.confirmed != 0 && (
                      <span style={{ fontSize: "0.5rem", color: "black" }}>
                        {numberFormat(dist.delta.confirmed)}
                        <IoTrendingUpOutline />
                        &nbsp;
                      </span>
                    )}
                </td>
                <td className="active">{numberFormat(dist.active)}</td>
                <td className="recvr">
                  {numberFormat(dist.recovered)}&nbsp;
                  {dist.delta != undefined &&
                    dist.delta.recovered != undefined &&
                    dist.delta.recovered != 0 && (
                      <span style={{ fontSize: "0.5rem", color: "black" }}>
                        {numberFormat(dist.delta.recovered)}
                        <IoTrendingUpOutline />
                        &nbsp;
                      </span>
                    )}
                </td>
                <td className="death">
                  {numberFormat(dist.deceased)}&nbsp;
                  {dist.delta != undefined &&
                    dist.delta.deceased != undefined &&
                    dist.delta.deceased != 0 && (
                      <span style={{ fontSize: "0.5rem", color: "black" }}>
                        {numberFormat(dist.delta.deceased)}
                        <IoTrendingUpOutline />
                        &nbsp;
                      </span>
                    )}
                </td>
                <td className="vaccine">{numberFormat(dist.vaccinated)}</td>
                <td className="tested">{numberFormat(dist.tested)}</td>
                <td className="popu">{numberFormat(dist.population)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Districtdata;

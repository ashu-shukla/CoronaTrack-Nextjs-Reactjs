import React, { useState, useEffect } from "react";
import { numberFormat } from "./numberformat";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import ReactTextTransition, { presets } from "react-text-transition";
import { IoTrendingUpOutline } from "react-icons/io5";
import { MdTouchApp, MdAccessTime } from "react-icons/md";
import IndiaMap from "./IndiaMap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { sortmindata } from "./sortmindata";
import { getStateObj } from "./dataManipulated";

const HomeTotal = ({ mindata }) => {
  const [value, setValue] = useState("India");
  const [disdata, setDis] = useState({});

  useEffect(() => {
    var d = sortmindata(mindata).find((state) => state.name == "India");
    var dat = Object.entries(mindata).find(([key, val]) => key == d.key);
    setDis(getStateObj(dat[1]));
  }, []);

  function handleChange(newValue) {
    setValue(newValue);
    var d = sortmindata(mindata).find((state) => state.name == newValue);
    var dat = Object.entries(mindata).find(([key, val]) => key == d.key);
    setDis(getStateObj(dat[1]));
  }

  function changeTime(t) {
    dayjs.extend(relativeTime);
    var formattedTime = dayjs(t).fromNow();
    return formattedTime;
  }
  return (
    <div className="total">
      <div className="totalinfo">
        <h2 style={{ padding: 0, margin: 0 }}>
          &nbsp;
          <ReactTextTransition
            text={`${value == "Total" ? "India" : value} `}
            springConfig={presets.gentle}
            style={{ margin: "0 4px" }}
            inline
          />
          &nbsp;
        </h2>
        <div className="horizontotal">
          <div style={{ width: "100%" }}>
            <div className="confirm">
              <p>Confirmed: </p>
              <ReactTextTransition
                text={`${numberFormat(disdata.confirmed)}`}
                springConfig={presets.gentle}
                style={{ margin: "0 4px" }}
                inline
              />
              <div style={{ height: 20 }}>
                {disdata.delta != undefined &&
                  disdata.delta.confirmed != undefined &&
                  disdata.delta.confirmed != 0 && (
                    <div className="delta" id="dconfirm">
                      <ReactTextTransition
                        text={`${numberFormat(disdata.delta.confirmed)} `}
                        springConfig={presets.gentle}
                        inline
                      />
                      <IoTrendingUpOutline />
                      &nbsp;
                    </div>
                  )}
              </div>
            </div>

            <div className="active">
              <p>Active: </p>
              <ReactTextTransition
                text={`${numberFormat(disdata.active)} `}
                springConfig={presets.gentle}
                style={{ margin: "0 4px" }}
                inline
              />
            </div>
            <div className="recvr">
              <p>Recovered: </p>
              <ReactTextTransition
                text={`${numberFormat(disdata.recovered)} `}
                springConfig={presets.gentle}
                style={{ margin: "0 4px" }}
                inline
              />

              <div style={{ height: 20 }}>
                {disdata.delta != undefined &&
                  disdata.delta.recovered != undefined &&
                  disdata.delta.recovered != 0 && (
                    <div className="delta" id="drecvr">
                      <ReactTextTransition
                        text={`${numberFormat(disdata.delta.recovered)} `}
                        springConfig={presets.gentle}
                        inline
                      />
                      <IoTrendingUpOutline />
                      &nbsp;
                    </div>
                  )}
              </div>
            </div>
            <div className="death">
              <p>Deceased: </p>
              <ReactTextTransition
                text={`${numberFormat(disdata.deceased)} `}
                springConfig={presets.gentle}
                style={{ margin: "0 4px" }}
                inline
              />

              <div style={{ height: 20 }}>
                {disdata.delta != undefined &&
                  disdata.delta.deceased != undefined &&
                  disdata.delta.deceased != 0 && (
                    <div className="delta" id="ddeath">
                      <ReactTextTransition
                        text={`${numberFormat(disdata.delta.deceased)} `}
                        springConfig={presets.gentle}
                        inline
                      />
                      <IoTrendingUpOutline />
                      &nbsp;
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "0.7rem" }}>Recovery Ratio</p>
              <div style={{ width: "30%", fontWeight: 700 }}>
                <CircularProgressbar
                  value={Math.round(
                    (disdata.recovered / disdata.confirmed) * 100
                  )}
                  text={`${Math.round(
                    (disdata.recovered / disdata.confirmed) * 100
                  )}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "1.3rem",
                    pathTransitionDuration: 0.5,
                    pathColor: "#e5f4e8",
                    textColor: "#29a745",
                    trailColor: "white",
                  })}
                />
              </div>
              <p style={{ fontSize: "0.7rem" }}>Active Ratio</p>
              <div style={{ width: "30%", fontWeight: 700 }}>
                <CircularProgressbar
                  value={Math.round((disdata.active / disdata.confirmed) * 100)}
                  text={`${Math.round(
                    (disdata.active / disdata.confirmed) * 100
                  )}%`}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "1.3rem",
                    pathTransitionDuration: 0.5,
                    pathColor: "#eff7ff",
                    textColor: "#007bff",
                    trailColor: "white",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: "0.7rem", color: "#4b1eaa" }}>
          <p>
            <MdAccessTime />
            About&nbsp;
            {changeTime(disdata.lastupdated)}
          </p>
        </div>
      </div>
      <div>
        <p id="click" style={{ textAlign: "left" }}>
          <MdTouchApp />
          Tap on map.
        </p>
        <IndiaMap mindata={mindata} onChange={handleChange} />
      </div>
    </div>
  );
};

export default HomeTotal;

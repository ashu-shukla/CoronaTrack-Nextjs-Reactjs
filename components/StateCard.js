import React, { useState } from "react";
import { numberFormat } from "./numberformat";
import { getdistobj, getStateObj } from "./dataManipulated";

import StateMap from "./StateMap";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

import ReactTextTransition, { presets } from "react-text-transition";
import {
  IoShieldCheckmarkOutline,
  IoTrendingUpOutline,
  IoPeopleCircleOutline,
} from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoAlertCircleOutline, IoDocumentOutline } from "react-icons/io5";
import { MdTouchApp, MdAccessTime } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { BiTestTube } from "react-icons/bi";
import Districtdata from "./Districtdata";

export default function StateCard({ stkey, stdata, statename }) {
  const [value, setValue] = useState("");
  const [disdata, setDis] = useState(getStateObj(stdata));
  const [isHidden, setHidden] = useState(true);
  function handleChange(newValue) {
    setValue(newValue);
    if (newValue == "") {
      var newobj = getStateObj(stdata);
      setDis(newobj);
    } else {
      setDis(getdistobj(stdata, newValue));
    }
  }

  function changeTime(t) {
    dayjs.extend(relativeTime);
    var formattedTime = dayjs(t).fromNow();
    return formattedTime;
  }

  const onClick = () => {
    setHidden(!isHidden);
  };

  return (
    stkey != "TT" && (
      <div className="stateCard-parent">
        <h2>{statename}</h2>
        <div className="stateCard" key={stkey}>
          <div className="stateInfo">
            <div>
              <ReactTextTransition
                style={{ fontWeight: 700 }}
                text={`${value} `}
                springConfig={presets.gentle}
                inline
              />
            </div>
            <div className="confirm">
              <p>Confirmed: </p>
              <ReactTextTransition
                text={`${numberFormat(disdata.confirmed)}`}
                springConfig={presets.gentle}
                style={{ margin: "0 4px" }}
                inline
              />
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
            <div className="death">
              <p>Deceased: </p>
              <ReactTextTransition
                text={`${numberFormat(disdata.deceased)} `}
                springConfig={presets.gentle}
                style={{ margin: "0 4px" }}
                inline
              />

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
          <div>
            {Object.entries(stdata.districts).find(
              ([key, value]) => key == "Unknown"
            ) == undefined ? (
              <p id="click">
                <MdTouchApp />
                Tap on map.
              </p>
            ) : (
              <p id="click" style={{ color: "red" }}>
                <IoAlertCircleOutline
                  style={{ verticalAlign: "top", display: "inline-block" }}
                />
                <span style={{ color: "red" }}>
                  District data not on the state bulletin.
                </span>
              </p>
            )}

            <StateMap stkey={stkey} stdata={stdata} onChange={handleChange} />
          </div>
        </div>
        <div className="testvacpop">
          <div>
            <BiTestTube />
            <br />
            <ReactTextTransition
              text={numberFormat(disdata.tested)}
              springConfig={presets.gentle}
              style={{ fontWeight: 700 }}
              inline
            />
            <br />
            People tested
          </div>
          <div>
            <IoShieldCheckmarkOutline />
            <br />
            <ReactTextTransition
              text={numberFormat(disdata.vaccinated)}
              springConfig={presets.gentle}
              style={{ fontWeight: 700 }}
              inline
            />
            <br /> Vaccine
            <br />
            Administered
          </div>
          <div>
            <IoPeopleCircleOutline />
            <br />
            <ReactTextTransition
              text={numberFormat(disdata.population)}
              springConfig={presets.gentle}
              style={{ fontWeight: 700 }}
              inline
            />
            <br />
            Population
          </div>
        </div>
        <div className="cardfooter">
          <div>
            <p id="lastupdated">
              <MdAccessTime />{" "}
              <span>About {changeTime(stdata.meta.last_updated)}</span>
            </p>
          </div>
          <div>
            <p id="lastupdated">
              <a href={stdata.meta.tested.source} target="_blank">
                <IoDocumentOutline /> Source
              </a>
            </p>
          </div>
          {Object.entries(stdata.districts).find(
            ([key, value]) => key == "Unknown"
          ) == undefined && (
            <div role="button" onClick={onClick} id="statelink">
              <p>
                {isHidden ? "Know More" : "Close"}
                {isHidden ? <GrLineChart /> : <IoMdCloseCircleOutline />}
              </p>
            </div>
          )}
        </div>
        {!isHidden && <Districtdata stdata={stdata} />}
      </div>
    )
  );
}

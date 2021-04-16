import React, { useEffect, useRef } from "react";
import { json } from "d3-fetch";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { isBrowser, isMobile } from "react-device-detect";

const StateMap = (props) => {
  const svgRef = useRef(null);
  const [width, height] = [432, 488];

  const colors = d3
    .scaleLog()
    .domain([500, 700000])
    .range(["white", "#FF073A"]);

  useEffect(() => {
    json(`/maps/${props.stkey}.json`).then((mapdata) => {
      const svg = d3.select(svgRef.current);
      let path = d3.geoPath();
      let mapDistricts = feature(mapdata, mapdata.objects.districts).features;

      svg
        .select(".district-borders")
        .selectAll("path")
        .data(mapDistricts)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "#FFBFCE")
        .attr("fill", function (d) {
          var x = [];
          x = Object.entries(props.stdata.districts).find(
            ([key, value]) => key == d.properties.district
          );
          if (x == undefined) {
            d3.select(this).style("fill", "white");
          } else {
            d3.select(this).style("fill", colors(x[1].total.confirmed));
          }
        });
      if (isMobile) {
        svg
          .select(".district-borders")
          .selectAll("path")
          .on("click", function (d, i) {
            if (i.properties.district != "Delhi") {
              var x = [];
              x = Object.entries(props.stdata.districts).find(
                ([key, value]) => key == i.properties.district
              );
              if (x != undefined) {
                d3.select(this).style("fill", "#aeaef0");
                props.onChange(i.properties.district);
              }
            }
          });
      }
      if (isBrowser) {
        svg
          .select(".district-borders")
          .selectAll("path")
          .on("mouseover", function (d, i) {
            if (i.properties.district != "Delhi") {
              var x = [];
              x = Object.entries(props.stdata.districts).find(
                ([key, value]) => key == i.properties.district
              );
              if (x != undefined) {
                d3.select(this).style("fill", "#aeaef0");
                props.onChange(i.properties.district);
              }
            }
          });
      }

      svg
        .select(".district-borders")
        .selectAll("path")
        .on("mouseout", function (d, i) {
          props.onChange("");
          var x = [];
          x = Object.entries(props.stdata.districts).find(
            ([key, value]) => key == i.properties.district
          );
          if (x != undefined) {
            d3.select(this).style("fill", colors(x[1].total.confirmed));
          }
        });
    });
  }, []);
  return (
    <div className="mapdiv">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
      >
        <g className="district-borders" />
      </svg>
    </div>
  );
};

export default StateMap;

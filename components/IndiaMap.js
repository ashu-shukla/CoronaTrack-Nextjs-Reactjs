import React, { useEffect, useRef } from "react";
import { json } from "d3-fetch";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { sortmindata } from "./sortmindata";
import { isBrowser, isMobile } from "react-device-detect";

const IndiaMap = (props) => {
  const svgRef = useRef(null);
  const [width, height] = [432, 488];
  const colors = d3
    .scaleLog()
    .domain([2500, 8000000])
    .range(["white", "#FF073A"]);

  useEffect(() => {
    json(`/maps/TT.json`).then((mapdata) => {
      const svg = d3.select(svgRef.current);
      let path = d3.geoPath();
      let mapStates = feature(mapdata, mapdata.objects.states).features;

      svg
        .select(".state-borders")
        .selectAll("path")
        .data(mapStates)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "#FFDFE6")
        .attr("fill", function (d) {
          sortmindata(props.mindata).map((state) => {
            if (d.properties.st_nm == state.name) {
              d3.select(this).style("fill", colors(state.confirm));
            }
          });
        });
      if (isMobile) {
        svg
          .select(".state-borders")
          .selectAll("path")
          .on("click", function (d, i) {
            d3.select(this).style("fill", "#aeaef0");
            props.onChange(i.properties.st_nm);
          });
      }
      if (isBrowser) {
        svg
          .select(".state-borders")
          .selectAll("path")
          .on("mouseover", function (d, i) {
            d3.select(this).style("fill", "#aeaef0");
            props.onChange(i.properties.st_nm);
          });
      }
      svg
        .select(".state-borders")
        .selectAll("path")
        .on("mouseout", function (d, i) {
          props.onChange("India");
          sortmindata(props.mindata).map((state) => {
            if (i.properties.st_nm == state.name) {
              d3.select(this).style("fill", colors(state.confirm));
            }
          });
        });
    });
  }, []);
  return (
    <div className="totalmapdiv">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
      >
        <g className="state-borders" />
      </svg>
    </div>
  );
};

export default IndiaMap;

import React, { useState } from "react";
import HomeTotal from "./HomeTotal";
import StateCard from "./StateCard";
import { sortmindata } from "./sortmindata";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "./Footer";

export default function HomePage({ mindata }) {
  const [hasMore, setMore] = useState(true);
  const [item, setItem] = useState(Array.from({ length: 2 }));
  const fetchMoreData = () => {
    if (item.length >= sortmindata(mindata).length) {
      setMore(false);
      return;
    }
    setItem(item.concat(Array.from({ length: 1 })));
  };
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <h1 style={{ textAlign: "center" }}>Coronavirus India Tracker</h1>
        <p style={{ padding: 10, fontSize: "0.8rem", textAlign: "center" }}>
          A crowdsourced effort to track the coronavirus in India, In the form
          of interactive maps and tables of the number of cases by state and
          district.
        </p>
      </div>
      <HomeTotal mindata={mindata} />
      <p style={{ padding: 10, fontSize: "0.8rem", textAlign: "center" }}>
        Compiled from State Govt. numbers as published by{" "}
        <a href="https://www.mohfw.gov.in/">MoHFW</a>.
      </p>
      <p style={{ padding: 10, fontSize: "0.8rem", textAlign: "center" }}>
        Population based on 2019 population projection by NCP{" "}
        <a href="https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf">
          report
        </a>
      </p>
      <InfiniteScroll
        dataLength={item.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {item.map((i, index) => {
          var mindat = [];
          mindat = Object.entries(mindata).find(
            ([key, value]) => sortmindata(mindata)[index].key == key
          );
          return (
            <StateCard
              key={sortmindata(mindata)[index].key}
              stkey={mindat[0]}
              stdata={mindat[1]}
              statename={sortmindata(mindata)[index].name}
            />
          );
        })}
      </InfiniteScroll>
      <Footer />
    </div>
  );
}

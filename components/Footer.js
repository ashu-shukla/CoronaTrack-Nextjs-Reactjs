import React from "react";
import { FiDatabase } from "react-icons/fi";

const Footer = () => {
  return (
    <div style={{ textAlign: "center", paddingBottom: 50 }}>
      <h3 style={{ fontWeight: 400 }}>
        © Designed by{" "}
        <a
          href="https://www.instagram.com/ashutoshshukla__/"
          target="_blank"
          style={{ fontWeight: 700 }}
        >
          Ashutosh Shukla
        </a>
      </h3>
      <p>
        <FiDatabase style={{ verticalAlign: "middle" }} />{" "}
        <a href="https://api.covid19india.org/" target="_blank">
          Crowdsourced data
        </a>
      </p>
    </div>
  );
};

export default Footer;

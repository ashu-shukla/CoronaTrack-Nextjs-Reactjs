import React from 'react'
import { IoAlertCircleOutline } from "react-icons/io5";
const Banner = () => {
    return (
        <div style={{ textAlign: "center", backgroundColor: '#ffdfe6', color: 'red', fontSize: '0.77rem' }}>
            <p style={{ padding: '10px', margin: '0px' }}>
                <IoAlertCircleOutline style={{ verticalAlign: "middle" }} />{" "}
                After 18 months of daily updates, API has been stopped since 31st October 2021.
            </p>
        </div>
    );
};

export default Banner;
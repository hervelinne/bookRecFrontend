import "./Home.css";
import React from "react";
import BannerImage from "../../assets/img/GirlReading.svg";
import {useEffect, useState} from "react";
import axios from "axios";

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
  }, []);

  return (
    <div className="home container-fluid">
      <div className="row">
        <div className="col-md-5 mt-5 mx-3 ">
          <img className="rounded float-left img-fluid"  src={`${BannerImage}`}  alt ="Girl reading a book"/>
        </div>
          <div className="col-md-6 mt-5 ">
            <h1 className="card-title mt-5 row" style={{fontSize:"5em", fontWeight: "bold"}}> Discover Our Selection of Books </h1>
            <h2 className="card-subtitle mb-2 text-muted row"> Our Book Collection </h2>
            <p className="card-text mt-1 row" style={{fontSize:"1.5em"}}> Our app simplifies the process of exploring books, allowing you to find and discover your favorite books in a few easy steps. </p>
          </div>
      </div>
    </div>
  );
};

export default Home;

import "./AboutUs.css";
import React from "react";
import MultipleBooks from "../../assets/img/about.jpg";
import {Image} from "react-bootstrap"; 

function AboutUs() {
  return (
    <div className="about-us">

      <Image src={MultipleBooks} fluid style={{ height: '300px', objectFit: 'cover'  }} />
      <div className="about-us-bottom">
          <h1 className="pt-3" style={{fontSize:"3.5em", fontWeight: "bold"}}> ABOUT US </h1>
          <p className="pt-4 text-center" style={{fontSize:"1.3em"}}>
              Welcome to BookRec - Your Digital Library of Infinite Stories!
              At BookRec, we're on a mission to transform the way you explore and experience the world of books. We're not just an app; we're your portal to a vast, ever-expanding library that fits in your pocket.
              Our mission is to democratize access to knowledge and imagination. We believe that every story deserves to be shared and every reader deserves a chance to discover. We're committed to making this vision a reality in the digital age.
          </p>
      </div>
    </div>
  );
};

export default AboutUs;

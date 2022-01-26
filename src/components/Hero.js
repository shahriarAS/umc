// Package Import
import React from "react";
import ReactHtmlParser from 'react-html-parser';

// CSS Import
import "../assets/css/hero.css";
import { useSelector } from "react-redux";

function Hero(props) {

  var classDB = useSelector((state) => state);


  const { group } = props;
  return (
    <section className="hero">
      {/* UMC Cover Image */}
      <div className="hero-heading">
        <h3>Welcome To</h3>
        {
          group ? (
            <>
              <h1>{group.groupName}</h1>
              <h3>Uzzal Math Club</h3>
            </>
          ) : <>
              <h1>UMC</h1>
              <h3>Uzzal Math Club</h3>
            </>
        }
      </div>
      {
        group ? (<>
          {classDB.NoticeDB[group.groupURL].notice ? (<>
            <div className="notice">
              <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>Notice</h1>
              {ReactHtmlParser(
                classDB.NoticeDB[group.groupURL].notice)}
            </div></>) : ""}
        </>) : ""

      }
    </section>
  );
}

export default Hero;

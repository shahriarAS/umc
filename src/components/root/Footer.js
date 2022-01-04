// Package Import
import React from "react";

// CSS Import
import "../../assets/css/footer.css";

function Footer() {
  return (
    <footer>
      {/* JSX Started */}
      <div className="container">
        <p className="copy">© UMC | ALL RIGHT RESERVED</p>
        <p>
          <span style={{ marginRight: "8px" }}>Made with 💖 by</span>
          <a href="https://facebook.com/sm.saleque" target="_blank">
            Saleque Bin Hossain Alif
          </a>
          <span style={{ marginRight: "8px", marginLeft: "8px" }}>&</span>
          <a href="https://facebook.com/shovon.0.ahmed" target="_blank">
            Shahriar Ahmed Shovon
          </a>
        </p>
        <nav className="foot-nav">
          <a href="https://facebook.com/groups/1776311095862477/">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCdXAtgPV5tx4Gmsjs1mcIcg/">
            {/* <img src={yt} alt="Youtube Link"/> */}
            <i className="fa fa-youtube"></i>
          </a>
        </nav>
        <div className="visit-counter"><img src="https://www.simple-counter.com/hit.php?id=zupqfp&nd=9&nc=4&bc=1" border="0" alt="Hit Counter"/>
        </div>
      </div>
      {/* JSX Finished */}
    </footer>
  );
}

export default Footer;

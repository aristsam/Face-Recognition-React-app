import React from "react";
import Tilt from 'react-parallax-tilt';
import "./Logo.css";
import facer from "./facer.png";

const Logo = () =>{
	return(
<div className="center ma4 mt0">
<Tilt className="Tilt shadow-2">
      <div>
        <img alt="logo" src={facer}/>
      </div>
    </Tilt>

</div>
);
}

export default Logo;
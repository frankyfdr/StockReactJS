import React, {useState}from "react";
import axios from "axios";
import "./style.css";
import settingsIco from "../../img/settings.png";
import loginimg from "../../img/login.png";

const Rightinfo = (props) =>
{
const handleSettingsClick = () => 
{
   
    var display = document.getElementById("sideSet").style.display = "block";
    


}

  return (
    <div >
    <label style={{color: 'black'}} > logged: {props.name}</label>
    
    <img
    alt=""
    id="ico"
    src={loginimg}
    onClick={() => {
    document.getElementById("login").style.display = "inline-flex";
    }}
    />

    <img
    alt=""
    onClick={handleSettingsClick}
    id="ico"
    src={settingsIco}
    />


</div>
        
    )
}

export default Rightinfo;
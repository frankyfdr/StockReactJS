import React, {useState}from "react";
import axios from "axios";
import "./style.css";
import settingsIco from "../../img/settings.png";
import loginimg from "../../img/login.png";
import Settings from "../Settings"
const Rightinfo = (props) =>
{
  
const [display, setDisplay] = useState("none");
const handleSettingsClick = (e) => 
{
  const moreinfo = document.querySelector("#sideSet");
  moreinfo.classList.toggle("on")


  e.preventDefault();
}
    
  return (
    <div className="lowMenu">
    <label style={{color: 'black'}} >{(props.name != "default") ? props.name : ''}</label>
    
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
    <div className="settingsContainer">
      <Settings list={props.list} display= {display}/>
    </div>
  

</div>
        
    )
}

export default Rightinfo;
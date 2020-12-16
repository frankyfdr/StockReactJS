import React from "react";
import axios from "axios";
import "./style.css";
import Rightinfo from "../RightInfo/Rightinfo.js";


const Seach = (props) => {

const mySubmitHandler = (e) => 
{
    let value = document.getElementById("inputT").value;
    let newList = props.symUser+","+value.toUpperCase()
    props.setSymList(newList);
    clearInterval(props.refresh);

  //  if(props.nameUser != "default")
    updateSymList(props,newList);

    e.preventDefault();
}
const updateSymList = (props,newList) =>
{
    axios.put(props.nodejs+"/api/update",{
        "username": props.username,
        "sym": newList
    })

}

return ( 
    <div>
<div className="searchBox">
    <form autoComplete="off" onSubmit={mySubmitHandler}>
        <input id="inputT"   type="text"/>
        <input id="searchBtn" type="submit" value="Search" />
    </form>
</div>
<Rightinfo name={props.nameUser} />
</div>
)
}
export default Seach;
import React,{useContext, useState} from "react";
import axios from "axios";
import "./style.css";
import {Context}  from "../API/Context.js"
import { updateSymList } from "../Controllers/Controllers.js"
const Seach = (props) => {
const [opt,setOpt] = useState("");

const ctx = useContext(Context)


const optclick = (sym) =>{

   let x = ctx[1].symUser.split(",");

    if(!x.includes(sym))
    {
        let newList = props.symUser+","+sym;
        props.setSymList(newList);
        clearInterval(props.refresh);
        if(props.nameUser != "default")
        updateSymList(ctx[6],ctx[4].username,newList)
    }
    else
    alert("Stock already in portfolio!")

    document.getElementById("search-opt").style.display = "none"
}

const viewOpt = (e) =>
{
   
    if(document.getElementById("inputT").value === "")
        document.getElementById("search-opt").style.display = "none"
    else
    {
    mySubmitHandler(e);
    document.getElementById("search-opt").style.display = "block";
    }
    e.preventDefault();
}
const focusout = (e) =>
{
    document.getElementById("inputT").value = ""
    document.getElementById("search-opt").style.display = "none"
}

const mySubmitHandler = (e) => 
{
        let search = document.getElementById("inputT");
        if(search.value != "")
        axios.get(props.nodejs+"/lookup/"+search.value).then((response) =>{
            response = response.data.finance.result[0].documents
            let opt = response.map((item) =>{
                return(
                    <div className="opt-stock"   onClick={()=>optclick(item.symbol)} key={item.symbol} name={item.symbol} >
                        <label name="sym" className="opt-text">{item.symbol}</label>
                        <label name="name" className="opt-text">{item.shortName}</label>
                    </div>
                )
            })
            setOpt(opt);
        })
        e.preventDefault();
}

const menuShow =() =>
{
    const menu = document.querySelector(".menu-container")
    menu.classList.toggle("show")
  
}
const isEnter = (event) => {
   
    if (event.key === "Enter") {
        optclick(event.target.value);
        focusout();
    }
  
  };
return ( 
    <div>
    <div className="HamMenu" onClick={menuShow}>
        <div className="optHamMenu"></div>
        <div className="optHamMenu"></div>
        <div className="optHamMenu"></div>
    </div>
<div className="searchBox">
    <div id="formSearch" >
        <div id="serchDiv">
        <input id="inputT" autoComplete="off" onChange={viewOpt} onKeyDown={isEnter}  onBlur={focusout}  type="text"/>
        <div id="search-opt">{opt} </div>
        </div>
        
    </div>
</div>

</div>
)
}
export default Seach;
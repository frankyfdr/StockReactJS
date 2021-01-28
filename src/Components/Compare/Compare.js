/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.css"
import {Link} from "react-router-dom";
import { Context } from "../API/Context.js";

const App = (props) =>
{
const ctx = useContext(Context)
const [search,setSearch] = useState();
const [opt,setOpt] = useState();
const card = ()=>
{
  if(ctx[0].symInfo.length!= 0)
  return( <div className="stock-card-container">
          <div className ="card-name"><label>{ctx[0].symInfo[0].name}</label></div>
          <div className="card-section">
            <label className="ratio-label">{ctx[0].symInfo[0].eps}</label>
          </div>
          <div className="card-section"></div>
          </div>)
}

const change = (e) =>{
  if(e.target.value!= "")
  {
    document.getElementById("new-card-opt").style.display ="block"
    axios.get(ctx[6]+"/lookup/"+e.target.value).then((response) =>{
      response = response.data.finance.result[0].documents
      let opt = response.map((item) =>{
          return(
              
                <label style={{color:"white",height:"40px",width:"100%"}} >{item.symbol}</label>
             
          )
      })
      setOpt(opt)
      console.log(opt)
  })
  }
}

const searchCard = () =>{
    setSearch(
    <div className="new-container">
      <input placeholder="search.." onChange={change} id="new-in" className="new-input" type="text"/>
      <div id="new-card-opt" className="new-card-opt">{opt}</div>
    </div>)
}

const newCard = ()=>
{
  return( 
        <div onClick={searchCard} onBlur={()=>{/*
          document.getElementById("new-in").value ="";setSearch("")
          document.getElementById("new-card-opt").style.display ="none"
          setOpt("")*/
          }} className="card-search">
          <label >+</label>
          {search}
        </div>)
}


  

 return(
    <div className="table-container">
      {/* --------------------------key section -------------------*/}
      <div className="key-container">
        <div name="profitable" className="key-section">
          <label className="key-label">Profitable</label>
          <div className="ratio-label-container">
          <label className="ratio-label">EPS</label>
          <label className="ratio-label">ROI</label>
          <label className="ratio-label">PL</label>
          </div>
        </div>
        <div className="key-section">
          <label className="key-label">Dept</label>
          <div className="ratio-label-container">
          <label className="ratio-label">EPS</label>
          <label className="ratio-label">ROI</label>
          <label className="ratio-label">PL</label>
          </div>
        </div>
        
      </div>
      {/* --------------------------end key section -------------------*/}
      {card() }
      {newCard()}
      
    </div>
)}

export default App;

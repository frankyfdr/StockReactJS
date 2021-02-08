/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.css"
import {Link} from "react-router-dom";
import { Context } from "../API/Context.js";
import e from "cors";

const App = (props) =>
{
const ctx = useContext(Context)
const [search,setSearch] = useState();
const [opt,setOpt] = useState();
const [cards, setCards] = useState();


const card = ()=>
{
  if(ctx[0].symInfo.length!= 0)

   var x = axios.get(ctx[6]+"/key/axp").then((resp)=>{
   resp = resp.data
   console.log(resp)
 return( <div className="stock-card-container">
          <div className ="card-name"><label>{resp.Name}</label></div>
          <div className="card-section">
          <label className="ratio-label">{resp.EPS}</label>
          </div>
          <div className="card-section"></div>
          </div>)
    })
    setCards(x)
    console.log(cards)
   
}

const setNew = () =>{
  alert()
}

const change = (e) =>{
  if(e.target.value!= "")
  {
    
    document.getElementById("new-card-opt").style.display ="block"
    axios.get(ctx[6]+"/lookup/"+e.target.value).then((response) =>{
      response = response.data.finance.result[0].documents
      let newCardSym = response.map((item) =>{
          return(
              
                <label style={{color:"white",height:"40px",width:"100%"}} >{item.symbol}</label>
             
          )
      })
      setOpt(newCardSym)
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
useEffect(() => {
  
  card()
  
  }, []);
 return(
    <div className="table-container">
      {/* --------------------------key section -------------------*/}
      <div className="key-container">
        <div name="profitable" className="key-section">
          <label className="key-label">All Rounders</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">PL</label></div>
          <div><label className="ratio-label">PEG Ratio</label></div>
          <div><label className="ratio-label">P/VP</label></div>
          </div>
        </div>
        <div className="key-section">
          <label className="key-label">Profitable</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">ROE</label></div>
          <div><label className="ratio-label">ROA</label></div>
          <div><label className="ratio-label">ROIC</label></div>
          <div><label className="ratio-label">Gross Margin</label></div>
          <div><label className="ratio-label">Net Profit Margin</label></div>
          </div>
        </div>

         <div className="key-section">
          <label className="key-label">Debt</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">D/PL</label></div>
          <div><label className="ratio-label">DL/EBITDA</label></div>
          <div><label className="ratio-label">Current Ratio</label></div>
          <div><label className="ratio-label">Gross Margin</label></div>
          </div>
        </div>
        
        <div className="key-section">
          <label className="key-label">Growth</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">Ebitda CARGR</label></div>
          <div><label className="ratio-label">Profit CARGR </label></div>
          </div>
        </div>
        

        <div className="key-section">
          <label className="key-label">GOV</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">GOV</label></div>
          <div><label className="ratio-label">GOV </label></div>
          </div>
        </div>
        

      </div>
      {/* --------------------------end key section -------------------*/}
      {cards}
      {newCard()}
      
    </div>
)}

export default App;
/*
all
p/l
peg
p_vp

rent
roe
roa
roic

mg bruta
mc lucro

divida
d/pl
dl/ebit
liq cor
dv burta/erbit

crescimento
cargr ebit
luc cager
*/
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.css"
import {Link} from "react-router-dom";
import { Context } from "../API/Context.js";

const App = (props) =>
{
const [cardCount,setcardCount] = useState(0);
const ctx = useContext(Context)
const [loaded,setLoaded] = useState(false);
const [opt,setOpt] = useState();
const [cards, setCards] = useState("");


const card = async ()=>
{
  const drop = document.getElementById("drop");
  var sym = drop.options[drop.selectedIndex].id;



  if(ctx[0].symInfo.length!= 0)
   var x = await axios.get(ctx[6]+"/key/"+sym).then((resp)=>{
     console.log(resp.data)
     
   resp = resp.data
   return( <div className="stock-card-container">
          <div className ="card-name"><label>{resp.Name}</label></div>
          
          {/*} ----------groowth Section------------{*/}
          <div className="card-section">
            <div> <label className="ratio-label">{resp.EPS}</label></div>
            <div> <label className="ratio-label">{resp.PEG}</label></div>
            <div> <label className="ratio-label">{resp.trailingPE}</label></div>
            <div> <label className="ratio-label">{resp.forwardPE}</label></div>
          </div>
          {/*} ----------Profit Section------------{*/}
          <div className="card-section">
            <div> <label className="ratio-label">{resp.ROE}</label></div>
            <div> <label className="ratio-label">{resp.ROA}</label></div>
            <div> <label className="ratio-label">{resp.ROIC}</label></div>
            <div> <label className="ratio-label">{resp.ProfitMargin}</label></div>
            <div> <label className="ratio-label">{resp.operatingMargins}</label></div>

          </div>
            {/*} ----------debpt Section------------{*/}
            <div className="card-section">
            <div> <label className="ratio-label">{resp.QuickRatio}</label></div>
            <div> <label className="ratio-label">{resp.currentRatio}</label></div>
            <div> <label className="ratio-label">{resp.debtToEquity}</label></div>
          </div>
          </div>) 
    })
    setCards(card => [...card, x]);
    setcardCount(cardCount+1)
    
    if(cardCount == 3)
    {
    document.getElementById("cardSearch").style.display ="none";
    }
   
  
}



useEffect(() => {
  

if(!loaded)
{
let result = ctx[0].symInfo.map((item)=>{
  setLoaded(true)
  return(
    <option id={item.sym}>{item.name}</option>
  )
  
})
setOpt(result)
  
}
  
  }, [ctx]);
 return(
    <div className="table-container">
      {/* --------------------------key section -------------------*/}
      <div className="key-container">
        <div name="profitable" className="key-section">
          <label className="key-label">Growth</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">EPS</label></div>
          <div><label className="ratio-label">PEG Ratio</label></div>
           <div><label className="ratio-label">Trailing PE</label></div>
           <div><label className="ratio-label">Forward PE</label></div>
          </div>
        </div>
        <div className="key-section">
          <label className="key-label">Profitable</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">ROE</label></div>
          <div><label className="ratio-label">ROA</label></div>
          <div><label className="ratio-label">ROIC</label></div>
          <div><label className="ratio-label">Profit Margin</label></div>
          <div><label className="ratio-label">Operating Margin</label></div>
          </div>
        </div>

         <div className="key-section">
          <label className="key-label">Debt</label>
          <div className="ratio-label-container">
          <div><label className="ratio-label">Quick Ratio</label></div>
          <div><label className="ratio-label">Current Ratio</label></div>
          <div><label className="ratio-label">debtToEquity</label></div>
          </div>
        </div>
        
      </div>
      {/* --------------------------end key section -------------------*/}
      {cards}
      <div id="cardSearch" className="card-search">
          <select id="drop" onChange={card}>
            <option selected disabled>Select Company</option>
            {opt}
          </select>
      
        </div>
      
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
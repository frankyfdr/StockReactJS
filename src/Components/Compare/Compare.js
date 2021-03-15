/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.css"
import {Link} from "react-router-dom";
import { Context } from "../API/Context.js";
import Chart from "../Chart/Chart.js"
const App = (props) =>
{
const [cardCount,setcardCount] = useState(0);
const ctx = useContext(Context)
const [loaded,setLoaded] = useState(false);
const [opt,setOpt] = useState();
const [chart,setChart] = useState();
const [cards, setCards] = useState("");
const EPS = "EPS indicates how much money a company makes for each share of its stock, and is a widely used metric to estimate corporate value.The higher a company's EPS, the more profitable it is considered to be."
const peg=" determine a stock's value while also factoring in the company's expected earnings growth"
const Tpe ="The trailing price-to-earnings ratio looks at a company's share price in the market relative to its past year's earnings per share."
const Fpe ="Forward P/E is a version of the ratio of price-to-earnings that uses forecasted earnings for the P/E calculation."
const roe =" Clarify which company is handling  in a better way their profit from their investors capital."
const roa ="It tells to investors the profit percentage of the company related to the assets, the higher the better."
const roic ="Return on invested capital (ROIC) is the amount of money a company makes that is above the average cost it pays for its debt and equity capital. A company is thought to be creating value if its ROIC exceeds 2% and destroying value if it is less than 2%"
const om ="Operating margin measures how much profit a company makes on a dollar of sales after paying for variable costs of production,"
const pm ="This ratio returns the percentage of profit generated from sales."
const qr ="Shows the capacity of the company of turning its asset into quick cash."
const cr="It measures the capacity of the company to pay their obligation within a year."
const dte =" Is the metric used to find how the company is able to cover their debt by using the shareholders equity."

const card = async ()=>
{


  const drop = document.getElementById("drop");
  var sym = drop.options[drop.selectedIndex].id;
  
  // checking if there is anything in the Context API
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
    setCards(card => [...card, x]); // concat to card hook
    setcardCount(cardCount+1) // counting the number of stock in the table
    
    //setting a limit of 4 stock in table
    if(cardCount == 3)
    {
      //hiding the dropdown menu
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

  const popupBox=(ratio)=>
  {
  
    if(ratio == "blank")
    {
      document.querySelector(".pop").classList.toggle("pop");
      document.getElementById("blank_lock").style.display = "none"
    }
    else
    {
      document.getElementById("blank_lock").style.display = "block"
      document.getElementById(ratio).classList.toggle("pop");
    }
  }

  const dropChartChange=()=>{
    const drop = document.getElementById("dropchart");
    var sym = drop.options[drop.selectedIndex].id;
    setChart(sym)
    
  }
 return(
  <div>
    <div className="table-container">
      <div onClick={()=>popupBox("blank") } id="blank_lock" class="blank_lock"></div>
      {/* --------------------------key section -------------------*/}
      <div className="key-container">
        <div name="profitable" className="key-section">
          <label className="key-label">Growth</label>
          <div className="ratio-label-container">
          <div onClick={()=>popupBox("eps")} name="label-ratio-legend"><div id="eps" className="popup" ><p className="ratio-info">{EPS}</p></div><label className="ratio-label">EPS</label></div>
          <div onClick={()=>popupBox("peg")} name="label-ratio-legend"><div id="peg" className="popup" ><p className="ratio-info">{peg}</p></div><label className="ratio-label">PEG Ratio</label></div>
          <div onClick={()=>popupBox("Tpe")} name="label-ratio-legend"><div id="Tpe" className="popup" ><p className="ratio-info">{Tpe}</p></div><label className="ratio-label">Trailing PE</label></div>
          <div onClick={()=>popupBox("Fpe")} name="label-ratio-legend"><div id="Fpe" className="popup" ><p className="ratio-info">{Fpe}</p></div><label className="ratio-label">Forward PE</label></div>
          </div>
        </div>
        <div className="key-section">
          <label className="key-label">Profitable</label>
          <div className="ratio-label-container">
          <div onClick={()=>popupBox("roe")} name="label-ratio-legend"><div id="roe" className="popup" ><p className="ratio-info">{roe}</p></div><label className="ratio-label">ROE</label></div>
          <div onClick={()=>popupBox("roa")} name="label-ratio-legend"><div id="roa" className="popup" ><p className="ratio-info">{roa}</p></div><label className="ratio-label">ROA</label></div>
          <div onClick={()=>popupBox("ROIC")} name="label-ratio-legend"><div id="ROIC" className="popup" ><p className="ratio-info">{roic}</p></div><label className="ratio-label">ROIC</label></div>
          <div onClick={()=>popupBox("pm")} name="label-ratio-legend"><div id="pm" className="popup" ><p className="ratio-info">{pm}</p></div><label className="ratio-label">Profit Margin</label></div>
          <div onClick={()=>popupBox("om")} name="label-ratio-legend"><div id="om" className="popup" ><p className="ratio-info">{om}</p></div><label className="ratio-label">Operating Margin</label></div>
          </div>
        </div>

         <div className="key-section">
          <label className="key-label">Debt</label>
          <div className="ratio-label-container">
          <div onClick={()=>popupBox("qr")} name="label-ratio-legend"><div id="qr" className="popup" ><p className="ratio-info">{qr}</p></div><label className="ratio-label">Quick Ratio</label></div>
          <div onClick={()=>popupBox("cr")} name="label-ratio-legend"><div id="cr" className="popup" ><p className="ratio-info">{cr}</p></div><label className="ratio-label">Current Ratio</label></div>
          <div onClick={()=>popupBox("dte")} name="label-ratio-legend"><div id="dte" className="popup" ><p className="ratio-info">{dte}</p></div><label className="ratio-label">debtToEquity</label></div>
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
    <div className="chart">
    <select id="dropchart" onChange={dropChartChange}>
      {opt}
    </select>
      <Chart sym={chart} />
    </div>
    </div>
   
    
)}

export default App;

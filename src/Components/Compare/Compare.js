/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"
import {Link} from "react-router-dom";




const App = (props) =>
{

  const [keyRatios, setKeyRatios] = useState([0,0,0]);
  
 
  async function getKeyRatios ()  {
    console.log(props.match.params);
    var sym = props.match.params.sym.split(',');
    const share1 = axios.get("https://frankyfdr.vercel.app/key/"+sym[0]);
    const share2 = axios.get("https://frankyfdr.vercel.app/key/"+sym[1]);
    const share3 = axios.get("https://frankyfdr.vercel.app/key/"+sym[2]);
    let result = await axios.all([share1,share2,share3]).then(axios.spread((...data) =>
    {
      return [data[0].data,data[1].data,data[2].data];
     
    })).catch(errors => {
      console.log(errors);
    })
    setKeyRatios(result);
  }

  useEffect(()=>{
    getKeyRatios()
  },[])
 

  const selectRow = (name,event) =>
  {
    let id = event.target.id;
  let newClass = "selectedRow";
  if(document.getElementById(id).className  === "KeyRleg")
   document.getElementById(id).className = "selectedRowLeg";
  else
  { 
    newClass = "KeyR";
    document.getElementById(id).className = "KeyRleg";
  }
  var cl = document.getElementsByName(name);
  for(var i = 0; i < cl.length; i++)
  {
    cl[i].className = newClass;
  }
  }
return(<div>
<div className="table">


<div className="TopInfo">
<div className="back"> <Link to="/" >voltar</Link></div>
<div className="stockName"><p>{keyRatios[0].Name}</p> <p>{keyRatios[0].Price} | {keyRatios[0].Change}%</p></div>
      <div className="stockName"><p>{keyRatios[1].Name}</p> <p>{keyRatios[1].Price} | {keyRatios[1].Change}%</p></div>
    <div className="stockName"><p>{keyRatios[2].Name}</p> <p>{keyRatios[2].Price} | {keyRatios[2].Change}%</p></div>
    </div>


<div className="side">
    <div className="KeyBlock">
      <div className="VerticalLegend">
        <div className="sideLegend">All Rounders
        </div>
    </div>
 
    </div>


    <div className="KeyBlock">
      <div className="VerticalLegend">
        <div className="sideLegend">Profitable
        </div>
    </div>
    <div className="infoBlock">
      <div className="KeyRatioLegend">
        <div className="KeyRleg" id="ROE"  onClick={(id) => selectRow("ROE",id)} > ROE </div>
        <div className="KeyR" name = "ROE">  {keyRatios[0].ROE} </div> 
        <div className="KeyR" name = "ROE"> {keyRatios[1].ROE} </div> 
        <div className="KeyR" name = "ROE"> {keyRatios[2].ROE} </div> 
      </div>
      <div className="KeyRatioLegend">
      <div className="KeyRleg" id="EPS"  onClick={(id) => selectRow("EPS",id)}> EPS </div> 
      <div className="KeyR" id="EPS" name="EPS"  onClick={(id) => selectRow("EPS",id)}> {keyRatios[0].EPS}</div>
      <div className="KeyR" id="EPS"  name ="EPS" onClick={(id) => selectRow("EPS",id)}> {keyRatios[1].EPS}</div> 
      <div className="KeyR" id="EPS"  name ="EPS" onClick={(id) => selectRow("EPS",id)}> {keyRatios[2].EPS}</div>  
    </div>
    </div>
    </div>

    <div className="KeyBlock">
      <div className="VerticalLegend">
        <div className="sideLegend">Debt
        </div>
    </div>
    <div className="infoBlock">
      <div className="KeyRatioLegend">
        <div className="KeyRleg" id="WCapital"  onClick={(id) => selectRow("Wcapital",id)}> Working Capital </div> 
        <div className="KeyR"  name="Wcapital" > {keyRatios[0].WorkingCapital}</div>  
        <div className="KeyR"  name="Wcapital" > {keyRatios[1].WorkingCapital}</div>  
        <div className="KeyR" name="Wcapital" > {keyRatios[2].WorkingCapital}</div>      

        </div>
        <div className="KeyRatioLegend">
    
    <div className="KeyRleg" id="QR"  onClick={(id) => selectRow("QR",id)}> Quick Ratio </div> 
    <div className="KeyR"  name="QR" > {keyRatios[0].QuickRatio}</div>  
    <div className="KeyR"  name="QR" > {keyRatios[1].QuickRatio}</div>  
    <div className="KeyR" name="QR" > {keyRatios[2].QuickRatio}</div>      
    </div>

    <div className="KeyRatioLegend">
    
    <div className="KeyRleg" id="dte"  onClick={(id) => selectRow("dte",id)}> Debt to Equity </div> 
    <div className="KeyR"  name="dte" > {keyRatios[0].Debt_Equity}</div>  
    <div className="KeyR"  name="dte" > {keyRatios[1].Debt_Equity}</div>  
    <div className="KeyR" name="dte" > {keyRatios[2].Debt_Equity}</div>      
    </div>

    </div>

    </div>

    <div className="KeyBlock">
      <div className="VerticalLegend">
        <div className="sideLegend">Growth</div>
    </div>
    <div className="KeyRatioLegend">
    <div className="KeyRleg" id="dte"  onClick={(id) => selectRow("dte",id)}> Grow ratio 1 </div> 
      <div className="KeyR"> P/L </div>
      <div className="KeyR"> P/L </div> 
      <div className="KeyR"> P/L </div> 
       
    </div>
    </div>

    <div className="KeyBlock">
      <div className="VerticalLegend">
        <div className="sideLegend">Governance
        </div>
    </div>
    <div className="KeyRatioLegend">
    <div className="KeyRleg" id="dte"  onClick={(id) => selectRow("dte",id)}> Gov ratio 1 </div> 
      <div className="KeyR"> P/L  </div>
      <div className="KeyR"> P/L </div> 
      <div className="KeyR"> P/L </div> 
       
    </div>
    </div>
</div>
    </div>  
  </div>

  

)}

export default App;

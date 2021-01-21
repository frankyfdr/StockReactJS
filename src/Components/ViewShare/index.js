import React,{useState} from "react";
import "./style.css";
import Stock from "../Stock/index.js"  

const ViewShare = (props) => {
const [price] = useState(props.price);
const [change] = useState(props.change);

const stk = () =>
{

  
  props.setStk(props.idx)
  const stock = document.querySelector("#stock-view-container")
   document.querySelector("#blank").style.display = "block"
  if(stock != null)
  {
    stock.classList.toggle("on")
    
  }
}

const ShowMore = (e) => {

  
  let id = e.target.id;
  if(id.includes("."))
  {
    var str = id.split(".")
    id = str[0]+'\\.'+str[1];
  }
  console.log(id)
  const moreinfo = document.querySelector("#M"+id);
  moreinfo.classList.toggle("on")

}

  return (
    <div className="stock-container"  onClick={stk} style={{margin: '1%'}} >
    <div id={props.sym} className={props.type} >
    
      <div id={props.sym} className="NameBox"  >
        <label id={props.sym} className="symName">{props.sym}</label>
      </div>
      <div className="infoText">
        <label className="txtPrice"> {price} </label>
        <label className={props.color}>{props.change} ({props.percent}%) </label><br/>
      </div>
      
    </div>
    <div id={"M"+props.sym} className="moreinfo"></div>
    </div>
    
  );
};
export default ViewShare;

/*   <p className="txtNome">{props.name}</p>

    <div className="shareBox">
      <div className="imgBox"> </div>
      <div className="infoText">
        <text className="txtPrice"> {props.price} </text>
        <text className={props.color}> {props.change} </text>
        <p className="txtNome">{props.name}</p>
      </div>
    </div>
    */

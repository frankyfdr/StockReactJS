import React,{useState} from "react";
import "./style.css";




const ViewShare = (props) => {
const [price] = useState(props.price);
const [change] = useState(props.change);

const ShowMore = (e) => {
  const moreinfo = document.querySelector("#M"+e.target.id);
  moreinfo.classList.toggle("on")

}

  return (
    <div className="stock-container"  style={{margin: '1%'}}>
    <div id={props.sym} className={props.type} >
      <div id={props.sym} className="NameBox" onClick={ShowMore} >
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

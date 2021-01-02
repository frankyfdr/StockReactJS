import React,{useState} from "react";
import "./style.css";




const ViewShare = (props) => {
const [price] = useState(props.price);
const [change] = useState(props.change);

const clickedHandle = (id) => {

  var NameStyle = document.getElementById(id).style.width = "100%";

}

  return (
    <div  className={props.type} >
  
      <div id={props.sym} className="NameBox" >
        <label className="symName">{props.sym}</label>
      </div>
      <div className="infoText">
        <label className="txtPrice"> {price} </label>
        <label className={props.color}>{props.change} ({props.percent}%) </label><br/>
     
      </div>
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

import React,{useState} from "react";
import "./style.css";




const ViewShare = (props) => {
const [price] = useState(props.price);
const [change] = useState(props.change);

const clickedHandle = (id) => {

  var NameStyle = document.getElementById(id).style.width = "100%";

}

  const style = [
    {
      "background-color": "#D9AFD9",
      "background-image": " linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
    },
    {
      "background-color": "#FFE53B",
      "background-image": "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
    },
  ];

  return (
    <div  className="shareBox" onClick={() =>clickedHandle(props.sym)}>
  
      <div id={props.sym} className="NameBox" style={style[1]}>
        <label className="symName">{props.sym}</label>
      </div>
      <div className="infoText">
        <label className="txtPrice"> {price} </label>
        <label className={props.color}>{props.change} ({props.percent}%) </label><br/>
        <p className="txtNome">{props.name}</p>
      </div>
    </div>
  );
};
export default ViewShare;

/*

    <div className="shareBox">
      <div className="imgBox"> </div>
      <div className="infoText">
        <text className="txtPrice"> {props.price} </text>
        <text className={props.color}> {props.change} </text>
        <p className="txtNome">{props.name}</p>
      </div>
    </div>
    */

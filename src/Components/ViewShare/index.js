import React from "react";
import "./style.css";

const ViewShare = (props) => {
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
  let src = "";
  try {
    src = props.logoList[props.sym];
  } catch (e) {
    src = props.imgSrc;
  }
  return (
    <div className="shareBox">
      <div className="NameBox" style={style[1]}>
        <label className="symName">{props.sym}</label>
      </div>
      <div className="infoText">
        <text className="txtPrice"> {props.price} </text>
        <text className={props.color}> {props.change} </text><br/>
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

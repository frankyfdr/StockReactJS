import React from "react";
import "./style2.css";

const ViewShare = (props) => {
  let src = "";
  try {
    src = props.logoList[props.sym];
  } catch (e) {
    src = props.imgSrc;
  }
  return (
    <div className="shareBox">
      <div className="imgBox">
        <img src={src} className="stockLogo" alt={props.sym} id={props.sym} />
      </div>
      <div className="infoText">
        <text className="txtPrice"> {props.price} </text>
        <text className={props.color}> {props.change} </text>
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

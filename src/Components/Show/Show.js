import React from "react";
import "./style.css";
import { GetLogo } from "../API/GetLogo";

const Show = (props) => {
  if(props.list !== undefined || props.list.length === 0) 
  {
  try {
    var cntw = props.list.winner.length;
    var cntl = props.list.loser.length;
    if (props.listCnt.cntl !== cntl || props.listCnt.cntw !== cntw) {
      
      props.setListCnt({ cntl, cntw });
    }
 
  return (
    <div className="Show" id="show">
      <div>
        <div className="titleWinners">Top Winners</div>
        <div className="winners" id="idWinner">
          {props.list.winner}
        </div>
      </div>
      <div>
        <div className="titleLosers">Top Losers</div>
        <div className="losers" id="idLooser">
          {props.list.loser}
        </div>
      </div>
    </div>
  );
  
    }catch (e) {}
  }
  else
    return <div> Nothing to</div>;
  
}
export default Show;

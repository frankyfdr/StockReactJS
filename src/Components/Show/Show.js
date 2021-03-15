import React,{useState} from "react";
import "./style.css";
import ViewShare from "../ViewShare";


const Show = (props) => 
{
  const [symInfo, setSymInfo] = useState(props.symInfo);
var loser = [];
var winner = [];
  
 symInfo.map((item,idx) =>{
   var state = "Mopen"
  if(item.marketState !== "REGULAR") 
  state ="Mclose"
  if(item.change < 0)
    loser.push(<ViewShare idx={idx}  Mstate={state} stk={props.stk} setStk={props.setStk} symInfo={symInfo} key={item.sym} type={"red"} color={"Cred"} name={item.name} sym={item.sym} price={item.price} change={item.change} percent={item.percent} />)
  else
    winner.push(<ViewShare idx={idx} Mstate={state} stk={props.stk} setStk={props.setStk} key={item.sym} type={"green"}  color={"Cgreen"} name={item.name} sym={item.sym} price={item.price} change={item.change} percent={item.percent} />)


  })
  OrderByAsc(winner,loser);
  return (<div className="Show" id="show">
  <div>
    <div className="titleWinners">Top Winners</div>
    <div className="winners" id="idWinner">
      {winner}
    </div>
  </div>
  <div>
    <div className="titleLosers">Top Losers</div>
    <div className="losers" id="idLooser">
      {loser}
    </div>
  </div>
</div>)
}

const  OrderByAsc = (winner, loser) => {

  loser.sort((a, b) =>
    a.props.percent < b.props.percent
      ? 1
      : b.props.percent < a.props.percent
      ? -1
      : 0
  );

  winner.sort((a, b) =>
    a.props.percent < b.props.percent
      ? 1
      : b.props.percent < a.props.percent
      ? -1
      : 0
  );
 
}
export default Show;
